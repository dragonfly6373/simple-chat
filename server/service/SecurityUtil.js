var chatController = require('../controller/chat-controller.js');
var USER_ROLES = require('../mongodb/model/User.js').USER_ROLES;

var SecurityUtil = (function() {
    function getCurrentLogin(req) {
        if (!req.session.current_login) return null;
        return req.session.current_login;
    }
    return {
        LOGIN_REQUIRED: function(req) {
            if (!getCurrentLogin(req)) return false;
        },
        SYSTEM_ADMIN: function(req) {
            var userInfo = getCurrentLogin(req);
            if (userInfo && userInfo.userRole == USER_ROLES.ADMIN) return true;
            return false;
        },
        accountRequireRole: function(minimumRole) {
            return function(req) {
                var userInfo = getCurrentLogin(req);
                return (userInfo.userRole >= minimumRole);
            };
        },
        roomRequireRole: function(room_id, minimumRole) {
            return function(req) {
                var userInfo = getCurrentLogin(req);
                var isRoomAdmin = new Promise(function(resolve, reject) {
                    chatController.getGroupInfo.implementation.apply(null, room_id, function(error, data) {
                        if (error) reject();
                        else if (data.roomAdmin.id == userInfo.id) {
                            resolve(true);
                        } else {
                            reject();
                        }
                    });
                });
                return isRoomAdmin;
            };
        }
    };
})();

module.exports.SecurityUtil = SecurityUtil;
module.exports.USER_ROLES = USER_ROLES;
