function Login() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, Login);

Login.prototype.doLogin = function() {
    var email = this.itemEmail.value;
    var pwd = this.itemPassword.value;
    $userService.login(email, pwd,
        (data) => {
            console.log("Login success:", data);
        },
        (error) => {
            console.log("fail to login. Please check your username and password");
        });
}