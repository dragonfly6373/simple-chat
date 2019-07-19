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
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            request.send(isGet ? null : body);
            if (listener) listener.busy();
        };
    }
    return {
        get: makeRequestFunction("GET", true),
        post: makeRequestFunction("POST", false),
        postWithQueryString: makeRequestFunction("POST", true)
    }
})();
