/*
** edit URL -> onHashChange -> detach parent nav -> implement component by hash
** click on nav-control (tab, menu link) -> updateNavComponent = true -> updateHash
*/

(function() {
    function NavModule() {
        this._updateNavComponent = true;
        this._component = null;
        this._hashname = "";
        this._next = null;
    }
    NavModule.getHash = function(url) {
        var matching = url.match(/#(\/[\w+[\/w+]*)/);
        if (!matching || matching.length < 2) return "";
        return matching[1];
    }
    NavModule.fromHashArray = function(hashArr) {
        if (!hashArr || hashArr.length == 0) return null;
        var module = new NavModule();
        module._hashname = hashArr[0];
        module._next = NavModule.fromHashArray(hashArr.slice(1));
    }
    NavModule.buildHash = function(navModule) {
        var modules = navModule.getHashArray();
        return modules.join("/");
    }
    NavModule.prototype.getHashArray = function() {
        var hashArr = [];
        hashArr.push(this._hashname);
        if (this._next) {
            var nextHashArr = this._next.getHashArray();
            if (nextHashArr && nextHashArr.length) {
                hashArr = hashArr.concat(nextHashArr);
            }
        }
        return hashArr;
    }
    NavModule.prototype.setRoot = function(component, moduleName) {
        var routing = component.getNavigationModule();
        if (!routing) return;
        this._component = component;

        var currentHash = NavModule.getHash(document.URL);
        var hashArray = currentHash.split("/");
        var moduleName = moduleName ? moduleName :((hashArray && hashArray.length > 1) ? hashArray[1] : null);
        this._implement(moduleName);
    }
    NavModule.prototype.setup = function(component) {
        var parentNav = Dom.findUpwardForNodeWithData(component.__node, "_navmodule");
        if (!parentNav) {
            console.error("NavigationModule does not setup");
            return;
        }

        var parent = parentNav._navmodule;
        var currentHash = NavModule.getHash(document.URL);
        var hashArray = currentHash.split("/");
        var moduleName = false;
        for (var i = 0; i < hashArray.length; i++) {
            console.log("loop hash:", hashArray[i], parent._hashname);
            if (hashArray[i] == parent._hashname) {
                moduleName = hashArray[i + 1];
                break;
            }
        }
        parent._next = new NavModule();
        var navModule = parent._next;
        navModule._component = component;
        navModule._implement(moduleName);
    }

    NavModule.prototype._implement = function(moduleName) {
        var routing = this._component.getNavigationModule();
        var module = routing.modules.reduce(function(a, c) {
            if (moduleName && c.name == moduleName) return c;
            else if (a == null && !moduleName && c.defaultActive) return c;
            else return a;
        }, null);
        if (!module) module = routing.modules[0];
        this._hashname = module.name;
        console.log("# active hashname:", module.name);
        this._component.__node._navmodule = this;
        if (routing.onNavigate) routing.onNavigate(module);
        else if (routing.viewer && module.implementation) {
            routing.viewer.innerHTML = "";
            var impl = new module.implementation();
            impl.into(routing.viewer);
        }
    }
    /* From ROOT */
    NavModule.prototype.onHashChange = function(hashArray) {
        if (!this._updateNavComponent) {
            this._updateNavComponent = true;
            return;
        }
        if (hashArray instanceof Array && hashArray.length > 1) {
            if (this._hashname == hashArray[1] && this._next) {
                this._next._updateNavComponent = this._updateNavComponent;
                this._next.onHashChange(hashArray.slice(1));
            } else {
                this._hashname = hashArray[1];
                var config = this._component.getNavigationModule();
                var module = config.modules.reduce(function(a, c) {
                    if (hashArray[1] && c.name == hashArray[1]) return c;
                    else if (a == null && !hashArray[1] && c.defaultActive) return c;
                    else return a;
                }, null);
                config.onNavigate(module);
            }
        }
        this._updateNavComponent = true;
    }
    /* From ROOT */
    NavModule.prototype.updateHash = function(component, moduleName) {
        this._updateNavComponent = false;
        var navModule = component.__node._navmodule;
        navModule._hashname = moduleName;
        var hashStr = NavModule.buildHash(this);
        location.hash = "/" + hashStr;
    }

    window.NavigationModule = new NavModule();

    var lastURL = document.URL;
    window.addEventListener("hashchange", function(event) {
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true, value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true, value:document.URL});
        lastURL = document.URL;
        var oldHash = NavModule.getHash(event.oldURL);
        var newHash = NavModule.getHash(event.newURL);
        var hashArray = newHash.split("/");
        window.NavigationModule.onHashChange(hashArray);
    });
})();
