function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
    this._navigationModule = null;
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    console.log("MainContentWrapper -- attached");
    this._navigationModule = window.NavigationModule;

    this.mainBody.innerHTML = "";
    if (APP_CONTEXT.CURENT_LOGIN) {
        this._navigationModule.setRoot(this, "chat");
    } else {
        this._navigationModule.setRoot(this, "login");
    }
}

MainContentWrapper.prototype.getNavigationModule = function() {
    var thiz = this;
    // if (!APP_CONTEXT.CURENT_LOGIN) return null;
    return {
        modules: [
            {name: "login", implementation: _pkg.account.Login},
            {name: "signup", implementation: _pkg.account.Signup},
            {name: "chat", implementation: _pkg.chat.ChatContainer},
            {name: "test", implementation: TestNavigation, defaultActive: true}
        ],
        onNavigate: function(module) {
            // TODO: update menubar
            console.log("Component: ", module);
            thiz.mainBody.innerHTML = "";
            var imp = new module.implementation();
            imp.into(thiz.mainBody);
            return this;
        }
    };
}
