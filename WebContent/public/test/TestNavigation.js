function TestNavigation() {
    BaseTemplatedWidget.call(this);
    this.bind("click", function(event) {
        // if (!forName) return;
        this.activeTab(event.target);
    }, this.tabHeaderContainer)
}
__extend(BaseTemplatedWidget, TestNavigation);

TestNavigation.prototype.onAttached = function() {
    NavigationModule.setup(this);
}

TestNavigation.prototype.activeTab = function(header) {
    var forName = Dom.getAttributeAsString(header, "for-name");
    console.log("#ActiveTab:", forName);
    Dom.doOnAllChildren(this.tabBodyContainer, function(node) {
        Dom.toggleClass(node, "Active", false);
    });
    var activeContent = this[forName];
    // if (!activeContent) return;
    Dom.toggleClass(activeContent, "Active", true);
}

TestNavigation.prototype.getNavigationModules = function() {
    var thiz = this;
    return {
        modules: [
            {name: "tab1", implemenation: null},
            {name: "tab2", implemenation: null, defaultActive: true},
            {name: "tab3", implemenation: null}
        ],
        onNavigate: function(module) {
            console.log("# active module", module);
            var item = thiz[module.name];
            thiz.activeTab(item);
        }
    };
}