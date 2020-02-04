/*
 * edit URL -> window fire event popstate -> detach parent nav -> implement component by hash
 * click on nav-control (tab, menu link) -> updateNavComponent = true -> updateHash
 * MainContentWrapper / module-1
 *                    / module-2 / submodule-2.1 / ? param=value / #hash / subhash
 * DOM_STRUCTURE: MainContentWrapper: { ClassAdmin: {tabpane: [tab1: {}, tab2: {}, tab3: {}]}}
 * location: team/demo-c/[cms/class-admin/general]
 * location: team/demo-c/[]
*/

(function() {
    var ModuleType = {
        URL_PATH: "path",
        URL_HASH: "hash"
    };
    var LocationUpdateMode = {
        CHANGE_MODULE: 1,
        APPEND_MODULE: 2,
        APPEND_HASH: 3
    };
    function NavModule() {
        this.widget = null;
        this.pathname = ""; // this.moduleName / sub_module / sub_module
        this.moduleType = null;
        this.subModules = [];
        this.currentActive = null;
    }
    NavModule.prototype.onLocationChange = function(url) {
        if (!this.widget) return;
        if (!this.current_path.length || !url.startWith(this.current_path)) {
            console.error("[Error]: invalid URL");
            return;
        }
        var moduleNames = url.subString(this.current_path).split("/");
        if (!moduleNames.length) {
            console.error("[Error]: invalid URL");
        }
    };
    NavModule.prototype.setup = function(widget) {
        var parentModule = Dom.findUpwardForNodeWithData(widget, "_navModule");
        if (parentModule == null) {
            this.widget = widget;
            this.pathname = "";
        }
        widget._navModule = this;
    };
    NavModule.prototype.navigateTo = function(moduleName) {
        var module = this.widget.getNavigationModule().modules.findIndex(function(module) {
            return module.name == moduleName;
        });
        if (!module) return;
        this.widget.getNavigationModule().onNavigate(module);
    };

    window.NavigationModule = new NavModule();
    window.NavigationModule.setDefaultURL = function(url) {
        this.defaultURL = url;
    };

    var lastURL = document.URL;
    window.addEventListener("popstate", function(event) {
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true, value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true, value:document.URL});
        lastURL = document.URL;
        // var oldHash = NavModule.getHash(event.oldURL);
        // var newHash = NavModule.getHash(event.newURL);
        // var hashArray = newHash.split("/");
        window.NavigationModule.onLocationChange(event.newURL);
    });
})();
