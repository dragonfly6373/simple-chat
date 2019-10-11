function Login() {
    BaseTemplatedWidget.call(this);
    thiz = this;
    this.bind("click", function() {
        Dom.toggleClass(thiz.loginForm, "Signup", true);
    }, this.linkRecovery);
    this.bind("click", function() {
        console.log("click on linkLogin");
        Dom.toggleClass(thiz.loginForm, "Signup", false);
    }, this.linkLogin);
    this.bind("click", function() {
        console.log("click on linkCreateNew");
        Dom.toggleClass(thiz.loginForm, "Signup", true);
    }, this.linkCreateNew);
    this.bind("click", this.doLogin.bind(this), this.btnLogin);
    this.bind("click", this.doRegister.bind(this), this.btnSignup);
}
__extend(BaseTemplatedWidget, Login);

Login.prototype.doLogin = function() {
    var email = this.itemEmail.value;
    var pwd = this.itemPassword.value;
    $userService.login(email, pwd,
        (data) => {
            SnackBar.show("You are currently login in account:" + data.name);
            location.reload();
        },
        (error) => {
            Dialog.alert("fail to login. Please check your username and password");
        });
}

Login.prototype.doRegister = function() {
    var data = {
        name: this.itemName.value,
        email: this.itemEmail.value,
        password: this.itemPassword.value
    };
    var thiz = this;
    $userService.signup(data, (result) => {
            if (result.error) {
                Dialog.alert("Fail to register your account: " + result.error,
                    "Please check your email or password and try again.", function() {
                        thiz.itemEmail.focus();
                    });
            } else {
                Dialog.alert("Your account have been create successfully.",
                    "Close dialog, login and enjoy", function() {
                        location.reload();
                    });
            }
        }, (error) => {
            Dialog.alert("Fail to register your account: " + error,
                    "Please check your email or password and try again.", function() {
                        thiz.itemEmail.focus();
                    });
        });
}