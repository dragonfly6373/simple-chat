// if (!window.HashChangeEvent)

function __setHash(widget) {
    var hash = widget.getHash();
}

var NavigationModule = (function() {
    var _viewer = null;
    var _root = null;
    var _currentActive = null;
    var _currentHash = "";
    var _index = 0;
    function setViewer(node) {
        _viewer = node;
    }
    function implement(feature, options) {
        if (!_viewer) {
            console.log("set view first");
            return;
        }
        var hash = feature.name;
        var impl = new feature.implemenation(options);
        _viewer.innerHTML = "";
        impl.into(_viewer);
    }
    function appendHash(name) {
        _currentHash += name;
        window.location.hash(_currentHash);
    }
    function hashChange(oldHash, newHash) {
        console.log("Old hash:", oldUrl);
        console.log("New hash:", newUrl);
        var oldHash = oldUrl.split("/");
        var newHash = newUrl.split("/");
    }
    function setup(component) {
        if (!_currentActive.children) _currentActive.children = [];
        _currentActive.children.push(component);
        component.parent = _currentActive;
    }
    function setRoot(component, moduleName) {
        var routing = component.getNavigationModules();
        if (!routing) return;
        var module = routing.modules.reduce(function(a, c) {
            if (moduleName && c.name == moduleName) return c;
            if (!moduleName && c.defaultActive) return c;
            return a;
        }, null);
        if (module) _currentActive = {name: moduleName, module: module};
        if (routing.onNavigate) routing.onNavigate(module);
        if (routing.viewer && module.implemenation) {
            var imp = new module.implementation();
            imp.into(routing.viewer);
        }
    }

    return {
        setViewer: setViewer,
        implement: implement,
        hashChange: hashChange,
        setRoot: setRoot
    };
})();

(function(){
    var lastURL = document.URL;
    console.log("# Catch HashChange event");
    function getHash(url) {
        var matching = url.match(/#\/([\w+[\/w+]*)/);
        if (!matching || matching.length < 2) return "";
        return matching[1];
    }
    window.addEventListener("hashchange", function(event) {
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true,value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true,value:document.URL});
        lastURL = document.URL;
        var oldUrl = getHash(event.oldURL);
        var newUrl = getHash(event.newURL);
        NavigationModule.hashChange(oldUrl, newUrl);
    });
}());
