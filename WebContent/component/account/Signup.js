function Signup() {
    BaseTemplatedWidget.call(this);
    this.bind("click", this.doRegister.bind(this), this.btnSubmit);
}
__extend(BaseTemplatedWidget, Signup);

Signup.prototype.onAttached = function() {
    console.log("### Signup Attached");
}

Signup.prototype.doRegister = function() {
    var data = {
        name: this.itemName.value,
        email: this.itemEmail.value,
        password: this.itemPasswd.value
    };
    var thiz = this;
    $userService.signup(data, (result) => {
            if (result.error) {
                Dialog.alert("Fail to login with email: " + data.email,
                    "Please check your email or password and try again.", function() {
                        thiz.itemEmail.focus();
                    });
            } else {
                Dialog.alert("Your account have been create successfully.",
                    "Close dialog, login and enjoy", function() {
                        location.hash = "/chat";
                    });
            }
        }, (error) => {
            SnackBar.show("Fail to regist your account info.");
        });
}
