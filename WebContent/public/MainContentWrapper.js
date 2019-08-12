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
        this._navigationModule.setRoot(this, "test");
    }
}

MainContentWrapper.prototype.getNavigationModules = function() {
    var thiz = this;
    return {
        modules: [
            {name: "login", implementation: _pkg.account.Login, defaultActive: true},
            {name: "signin", implementation: _pkg.account.Signin},
            {name: "chat", implementation: _pkg.chat.ChatContainer},
            {name: "test", implementation: TestNavigation}
        ],
        onNavigateXXX: function(module) {
            // TODO: update menubar
            console.log("Component: ", module);
            var imp = new module.implementation();
            imp.into(thiz.mainBody);
        },
        viewer: this.mainBody
    };
}
