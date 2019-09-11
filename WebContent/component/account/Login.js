function Login() {
    BaseTemplatedWidget.call(this);
    this.bind("click", this.doLogin.bind(this), this.btnLogin);
}
__extend(BaseTemplatedWidget, Login);

Login.prototype.doLogin = function() {
    var email = this.itemEmail.value;
    var pwd = this.itemPassword.value;
    $userService.login(email, pwd,
        (data) => {
            SnackBar.show("You are currently login in account:" + data.name);
            location.hash("/chat");
        },
        (error) => {
            Dialog.alert("fail to login. Please check your username and password");
        });
}
