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
                    if (!userInfo) {
                        reject(null);
                    }
                    if (userInfo.error) {
                        reject(userInfo.error);
                    }
                    window.APP_CONTEXT.CURRENT_LOGIN = userInfo;
                    resolve(userInfo);
                }, function(error) {
                    console.error("service call fail");
                    reject(null);
                });
            });
        },
        logOut: function() {
            return new Promise(function(resolve, reject) {
                $userService.logOut(function(result) {
                    window.APP_CONTEXT.CURRENT_LOGIN = null;
                    resolve(true);
                }, function(error) {
                    console.error("Fail to logout with error:", error);
                    reject();
                });
            });
        }
    };
})();
