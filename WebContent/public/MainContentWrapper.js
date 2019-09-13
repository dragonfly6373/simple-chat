function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
    this._navigationModule = null;
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    this.mainBody.innerHTML = "";
    this.getUserInfo();
}

MainContentWrapper.prototype.getUserInfo = function() {
    var thiz = this;
    APP_CONTEXT.requestUserInfo(true).then(function(data) {
        thiz.setupNavigationModule();
    }).catch(function(error) {
        var loginForm = new _pkg.account.Login();
        loginForm.into(thiz.mainBody);
    });
}

MainContentWrapper.prototype.setupNavigationModule = function() {
    this._navigationModule = window.NavigationModule;
    this._navigationModule.setRoot(this);
}

MainContentWrapper.prototype.getNavigationModule = function() {
    var thiz = this;
    return {
        modules: [
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
