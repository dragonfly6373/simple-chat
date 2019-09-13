window.APP_CONTEXT = (function() {
    return {
        CURRENT_LOGIN: null,
        CHAT_LIST: [],
        requestUserInfo: function(forceRequest) {
            return new Promise(function(resolve, reject) {
                if (!forceRequest && APP_CONTEXT.CURRENT_LOGIN) {
                    resolve(APP_CONTEXT.CURRENT_LOGIN);
                    return;
                }
                $userService.getUserInfo(function(userInfo) {
                    console.log("get userInfo", userInfo);
                    if (!userInfo) {
                        console.log("reject login");
                        reject(null);
                    }
                    if (userInfo.error) {
                        console.log("userINfo error");
                        reject(userInfo.error);
                    }
                    window.APP_CONTEXT.CURRENT_LOGIN = userInfo;
                    console.log("reqest current login - resolve with data:", userInfo);
                    resolve(userInfo);
                }, function(error) {
                    console.log("service call fail");
                    reject(null);
                });
            });
        },
        logOut: function() {
            return new Promise(function(resolve, reject) {
                $userService.logOut(function(result) {
                    console.log("Your account have been logout successfully.");
                    window.APP_CONTEXT.CURRENT_LOGIN = null;
                    resolve(true);
                }, function(error) {
                    console.log("Fail to logout with error:", error);
                    reject();
                });
            });
        }
    };
})();
