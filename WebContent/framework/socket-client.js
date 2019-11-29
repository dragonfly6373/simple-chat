function SocketClient(ns) {
    this.namespace = ns;
    this._module = io(this.namespace);
};

SocketClient.Event = {
    EVT_CONNECT: "connection",
    EVT_MESSAGE: "message",
    EVT_DISCONNECT: "disconnect",
    EVT_WELCOME: "welcome",
    EVT_HELLO: "hello",
    EVT_REQUEST_ROOM: "request_room",
    EVT_ROOM_JOIN: "room_accept",
    EVT_LEAVE: "leave",
};

SocketClient.USER_ROLE = {
    CUSTOMER: 1,
    CS_TEAM: 2
};

// Override:
SocketClient.prototype.onConnect = function() {
    console.warn("# SocketClient.onConnect method need to be override");
    this.emit(SocketClient.EVT_HELLO, {iam: SocketClient.USER_ROLE.CUSTOMER});
}
SocketClient.prototype.onJoin = function() {console.warn("# SocketClient.onJoin method need to be override");}
SocketClient.prototype.onMessage = function() {console.warn("# SocketClient.onMessage method need to be override");}
SocketClient.prototype.onLeave = function() {console.warn("# SocketClient.onLeave method need to be override");}
SocketClient.prototype.onDisconnect = function() {console.warn("# SocketClient.onDisconnect method need to be override");}

SocketClient.prototype.start = function(room, autoConnect) {
    this.socket = io(this.host);
    this.socket.on(SocketClient.Event.EVT_WELCOME, this.onConect.bind(socket));
};
