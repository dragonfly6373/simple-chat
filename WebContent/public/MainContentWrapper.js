function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    this.mainBody.innerHTML = "";
    this.getUserInfo();
}

MainContentWrapper.prototype.getUserInfo = function() {
    var thiz = this;
    APP_CONTEXT.requestUserInfo(true).then(function(data) {
        thiz.setup();
    }).catch(function(error) {
        console.log("fail to request UserInfo:", error);
        var loginForm = new _pkg.account.Login();
        loginForm.into(thiz.mainBody);
    });
}

MainContentWrapper.prototype.setup = function() {
    window.NavigationModule.setup(this);
    // TODO: setup left-menu bar
    var leftMenu = new LeftMenuBar();
    leftMenu.into(this.leftPane);
}

MainContentWrapper.prototype.requireLogin = function() {
    return (APP_CONTEXT.CURRENT_LOGIN ? true : false);
}

MainContentWrapper.prototype.getNavigationModule = function() {
    var thiz = this;
    return {
        modules: [
            {name: "chat", implementation: _pkg.chat.ChatContainer, visible: this.requireLogin.bind(this)},
            {name: "message", implementation: _pkg.chat.ChatBox, visible: this.requireLogin.bind(this)},
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
