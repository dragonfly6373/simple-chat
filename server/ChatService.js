var SecurityUtil = require("./service/SecurityUtil.js");
var ChatService = (function() {
    var Event = {
        EVT_CONNECT: "connection",
        EVT_MESSAGE: "message",
        EVT_DISCONNECT: "disconnect",
        EVT_WELCOME: "welcome",
        EVT_HELLO: "hello",
        EVT_REQUEST_ROOM: "request_room",
        EVT_ROOM_JOIN: "room_accept",
        EVT_LEAVE: "leave",
    };
    var USER_ROLE = {
        CUSTOMER: 1,
        CS_TEAM: 2
    };
    function generateTimeId() {
        var randomChar = function() {
            return Math.floor(Math.random() * 26 + 10).toString(36);
        };
        return (randomChar() + randomChar() + randomChar() + "-" + Math.floor(Date.now()).toString(36));
    }
    function _getUserInfo() {
        return SecurityUtil.session.getCurrentLogin(this.handshake);
    }

    var DEFAULT_ROOMS = {SERVICE_ROOM: {id: generateTimeId(), name: "Customer Service"}};

    function onJoin(message) {
        console.log("# socket join", (this._currentLogin ? this._currentLogin.name : ""));
        if (!message.room) {
            var room = DEFAULT_ROOMS.SERVICE_ROOM;
            this._rooms.push(room.id);
            this.join(room.id); // join to service_room
            this.in(room.id).emit(Event.EVT_WELCOME, {room: room});
            return;
        }
        var roomId = message.room;
        this.in(roomId).emit()
        // this.server.emit(Event.EVT_JOIN, {user_info: this._currentLogin});
    }
    function onMessage(message) {
        console.log("# socket onMessage", message, (this._currentLogin ? this._currentLogin.name : ""));
        this.server.emit(Event.EVT_MESSAGE, {user_info: _getUserInfo.call(this), message: message});
    }
    function onLeave(message) {
        console.log("# socket onLeave", message, (this._currentLogin ? this._currentLogin.name : ""));
        this.server.emit(Event.EVT_LEAVE, {user_info: _getUserInfo.call(this), message: message});
    }
    function leaveRoom(room_id) {
        if (!this._rooms[room_id]) return;
        this.leave(room_id);
        delete(this._rooms[room_id]);
    }
    function onDisconnect() {
        console.log("# socket onDisconnect", (this._currentLogin ? this._currentLogin.name : ""));
        this.server.emit(Event.EVT_DISCONNECT, {user_info: _getUserInfo.call(this)});
        this.disconnect(true);
    }
    return {
        start: function(io) {
            io.on(Event.EVT_CONNECT, function(socket) {
                console.log("# socket authorization");
                var currentLogin = _getUserInfo.call(socket);
                if (!currentLogin) {
                    console.warn("[SPAM] no-authorize user", currentLogin);
                    socket.disconnect();
                    return;
                }
                socket._currentLogin = currentLogin;
                socket.emit(Event.EVT_WELCOME, {account_info: currentLogin});
                socket.on(Event.EVT_HELLO, onJoin.bind(socket));
                socket.on(Event.EVT_MESSAGE, onMessage.bind(socket));
                socket.on(Event.EVT_LEAVE, onLeave.bind(socket));
                socket.on(Event.EVT_DISCONNECT, onDisconnect.bind(socket));
            });
        }
    };
})();

module.exports = ChatService;
