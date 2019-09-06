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
        // var chat = new _pkg.chat.ChatContainer();
        // chat.into(this.mainBody);
        this._navigationModule.setRoot(this, "chat");
    } else {
        // var loginPage = new _pkg.account.Login();
        // loginPage.into(this.mainBody);
        // this._navigationModule.setRoot(this, "login");
        this._navigationModule.setRoot(this);
    }
}

MainContentWrapper.prototype.getNavigationModules = function() {
    var thiz = this;
    return {
        modules: [
            {name: "login", implementation: _pkg.account.Login},
            {name: "signin", implementation: _pkg.account.Signin},
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
        },
        viewer: this.mainBody
    };
}
