
var NavigationModule = (function() {
    var ROOT = {
        _modules: {},
        _currentActive: null,
        _currentHash: []
    };
    function _implement(navModule, hashArrs) {
        var moduleName = hashArrs[0];
        var routing = navModule.component.getNavigationModules();
        if(!routing) return;
        var module = routing.modules.reduce(function(a, c) {
            if (moduleName && c.name == moduleName) return c;
            if (!moduleName && c.defaultActive) return c;
            return a;
        }, null);
        if (!module) return;
        console.log("navModule", routing);
        if (routing.onNavigate) routing.onNavigate(module);
        else if (routing.viewer && module.implementation) {
            routing.viewer.innerHTML = "";
            var impl = new module.implementation();
            impl.into(routing.viewer);
            // return impl;
        }
        if (hashArrs.length > 1) {
            if (!navModule.next || navModule.next.hash != hashArrs[0]) {
                _implement(navModule, hashArrs.slice(1));
                break;
            } else {
                console.log("implemented", navModule.hash);
                navModule = navModule.next;
            }
        }
    }
    function getHash(url) {
        var matching = url.match(/#\/([\w+[\/w+]*)/);
        if (!matching || matching.length < 2) return "";
        return matching[1];
    }
    function onHashChange(oldUrl, newUrl) {
        console.log("HashChange: Old hash:", oldHash, " --New hash:", newHash);
        var oldHash = oldUrl.split("/");
        var newHash = newUrl.split("/");
        var pointer = _root;
        if (newHash.length > 1) {
            if (!pointer.next || pointer.next.hash != newHash[0]) {
                _implement(pointer, newHash.slice(1));
                break;
            } else {
                console.log("implemented", pointer.hash);
                pointer = pointer.next;
            }
        }
    }
    function setRoot(component) {
        console.log("NavigationModule setRoot", component.name);
        var routing = component.getNavigationModules();
        if (!routing) return;
        ROOT._modules = {hash: "", component: component};
        ROOT._currentActive = _root;
        ROOT._currentHash = getHash(location.href).split("/");
        _implement(_currentActive);

    }
    function setup(component, moduleName) {
        ROOT._currentActive.next = component;
        ROOT._currentActive = ROOT._currentActive.next;
        return null;
    }
    function changeNavigation(navModule, moduleName) {

    }

    return {
        setRoot: setRoot,
        setup: setup,
        getHash: getHash,
        changeNavigation: changeNavigation,
        onHashChange: onHashChange
    };
})();
// if (!window.onHashChangeEvent)
(function(){
    var lastURL = document.URL;
    window.addEventListener("onHashchange", function(event) {
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true,value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true,value:document.URL});
        console.log("# Catch onHashChange event");
        lastURL = document.URL;
        var oldUrl = NavigationModule.getHash(event.oldURL);
        var newUrl = NavigationModule.getHash(event.newURL);
        NavigationModule.onHashChange(oldUrl, newUrl);
    });
}());
