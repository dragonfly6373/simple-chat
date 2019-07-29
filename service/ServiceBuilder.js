module.exports = (function() {
    var _services = {};
    function buildRouting(api_name, controller) {
        var params = [];
        var matching = controller.implementation.toString().match(/^function\s*(\w+)\s*\(([\w]+[,\s*\w+]*)\)/);
        var fnName = matching[1];
        if (matching && matching.length > 2) {
            params = matching[2].split(",");
            params = params.slice(0, params.length - 1).map(x => x.trim());
        }
        if (!_services[api_name]) _services[api_name] = {};
        var api = _services[api_name];
        console.log("### init API: ", api_name, fnName, params);
        if (!api[fnName]) api[fnName] = [];
        var service = api[fnName];
        service.push(controller.method);
        for (var i in params) {
            service.push(params[i]);
        }
        return function(req, res, next) {
            var values = [];
            for (var i in params) {
                values.push(req.body[params[i]]);
            }
            values.push(function(result) {
                res.json(result);
            });
            controller.implementation.apply(null, values);
        };
    }
    return {
        getAPIs: function() {
            return _services;
        },
        register: function(api_name, router, controllers) {
            Object.getOwnPropertyNames(controllers).forEach(function(name) {
                var controller = controllers[name];
                if (typeof(controller.implementation) !== "function") return;
                if (controller.method.toUpperCase() == "POST") {
                    router.post("/" + name, buildRouting(api_name, controller));
                } else {
                    router.get("/" + name, buildRouting(api_name, controller));
                }
            });
        }
    }
})();