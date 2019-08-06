function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    console.log("MainContentWrapper -- attached");
    this.mainBody.innerHTML = "";
    if (APP_CONTEXT.CURENT_LOGIN) {
        var chat = new _pkg.chat.ChatContainer();
        chat.into(this.mainBody);
    } else {
        var loginPage = new _pkg.account.Login();
        loginPage.into(this.mainBody);
    }
}
