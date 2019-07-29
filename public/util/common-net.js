var CommonNet = (function () {
    function makeRequestFunction(method, useQueryString) {
        return function (path, params, resolve, reject, listener, mime) {
            var request = new XMLHttpRequest();
            request.addEventListener("load", function () {
                try {
                    if (request.status != 200) {
                        reject(new Error("Response = " + request.status));
                        return;
                    }

                    var json = request.responseText;
                    var object = null;
                    try {
                        if (json) object = JSON.parse(json);
                    } catch(err) {
                        console.error(err);
                    }
                    resolve(object);
                } finally {
                    if (listener) listener.done();
                }
            });
            var isGet = (method == "GET");
            var url = path;
            var body = "";
            if (params) {
                for (var name in params) {
                    if (body) body += "&";
                    body += name + "=";
                    body += encodeURIComponent("" + params[name]);
                }

                if (useQueryString) {
                    url += url.indexOf("?") < 0 ? "?" : "&";
                    url += body;

                    body = null;
                }
            }
            if (mime) request.overrideMimeType(mime);
            request.open(method, url);
            if (method == "POST") {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                var data = JSON.stringify(params);
                console.log("POSTED data: ", data);
                request.send(data);
            } else {
                // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send(body);
            }
            if (listener) listener.busy();
        };
    }
    function initServices(services) {
        Object.getOwnPropertyNames(services).forEach(function(api_name) {
            Object.getOwnPropertyNames(services[api_name]).forEach(function(service) {
                if (!window["$" + api_name]) window["$" + api_name] = {};
                var api = window["$" + api_name];
                api[service] = function() {
                    var requiredParams = window._registry[api_name][service];
                    var method = requiredParams.splice(0, 1)[0];
                    if (arguments.length != requiredParams.length + 2) {
                        console.error("service " + api_name + "." + service + " missing parameters: require "
                            + (requiredParams.length + 2)
                            + " but got " + arguments.length);
                        return;
                    }
                    var params = {};
                    for (var p in requiredParams) {
                        params[requiredParams[p]] = arguments[p];
                    }
                    if (method.toUpperCase() == "POST") {
                        CommonNet.post(api_name + "/" + service, params, arguments[requiredParams.length], arguments[requiredParams.length + 1]);
                    } else {
                        CommonNet.get(api_name + "/" + service, params, arguments[requiredParams.length], arguments[requiredParams.length + 1]);
                    }
                }
            });
        });
    }
    return {
        get: makeRequestFunction("GET", true),
        post: makeRequestFunction("POST", false),
        postWithQueryString: makeRequestFunction("POST", true),
        initServices: initServices
    }
})();
