function TestNavigation() {
    BaseTemplatedWidget.call(this);
    this.bind("click", function(event) {
        // if (!forName) return;
        var  thiz = this;
        this.activeTab(event.target);
        var forName = Dom.getAttributeAsString(event.target, "for-name");
        var hashName = this.getNavigationModule().modules.reduce(function(a, c) {
            return (c.target == thiz[forName] ? c.name : a);
        }, "");
        NavigationModule.updateHash(this, hashName);
    }, this.tabHeaderContainer);
}
__extend(BaseTemplatedWidget, TestNavigation);

TestNavigation.prototype.onAttached = function() {
    if (this.attached) return;
    this.attached = true;
    console.log("TestNavigation -- Attached");
    NavigationModule.setup(this);
}

TestNavigation.prototype.activeTab = function(header) {
    var forName = Dom.getAttributeAsString(header, "for-name");
    console.log("#ActiveTab:", forName);
    Dom.doOnAllChildren(header.parentNode, function(node) {
        Dom.toggleClass(node, "Active", false);
    });
    Dom.toggleClass(header, "Active", true);
    Dom.doOnAllChildren(this.tabBodyContainer, function(node) {
        Dom.toggleClass(node, "Active", false);
    });
    var activeContent = this[forName];
    // if (!activeContent) return;
    Dom.toggleClass(activeContent, "Active", true);
}

TestNavigation.prototype.getNavigationModule = function() {
    var thiz = this;
    return {
        modules: [
            {name: "tab1", target: this.body1},
            {name: "tab2", target: this.body2, defaultActive: true},
            {name: "tab3", target: this.body3}
        ],
        onNavigate: function(module) {
            console.log("# TestNavigation active module", module);
            var item = thiz[module.name];
            thiz.activeTab(item);
            return null; // return next module
        }
    };
}
