function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
    this._navigationModule = null;
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    console.log("MainContentWrapper -- attached");
    this._navigationModule = window.NaviationModule;
    this._navigationModule.setViewer(this.mainBody);

    this.mainBody.innerHTML = "";
    if (APP_CONTEXT.CURENT_LOGIN) {
        var chat = new _pkg.chat.ChatContainer();
        chat.into(this.mainBody);
    } else {
        var loginPage = new _pkg.account.Login();
        loginPage.into(this.mainBody);
    }
}

MainContentWrapper.prototype.getNavigationModule = function() {
    return this._navigationModule;
}

MainContentWrapper.prototype._initRouting = function() {
    return {
        
    }
}
