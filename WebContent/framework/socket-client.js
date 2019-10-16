function SocketClient(host) {
    this.host = host || "localhost";
    this.namespace = {};
    this._module = io();
};

SocketClient.Event = {
    EVT_CONNECT: "connect",
    EVT_OPEN: "open",
    EVT_JOIN: "join",
    EVT_MESSAGE: "message",
    EVT_REFRESH: "refresh",
    EVT_LEAVE: "leave",
    EVT_DISCONNECT: "disconnect"
};

SocketClient.prototype.open = function() {
    this._module.open();
};

SocketClient.prototype.close = function() {
    this._module.close();
};

SocketClient.prototype.emit = function(event, message) {
    this._module.emit(event, message);
};

SocketClient.prototype.newNamespace = function(ns_name) {
    var ns = this.namespace[ns_name];
    if (!ns) {
        ns = new SocketClient.Namespace(ns_name, this._module);
        this.namespace[ns_name] = ns;
    }
    return ns;
};

SocketClient.prototype.newRoom = function(ns_name, room_name) {
    var ns = this.newNamespace(ns_name);
    var room = ns.room[room_name];
    if (!room) {
        room = new SocketClient.Room(room_name, ns._module);
        ns.room[room_name] = room;
    }
    return room;
}

SocketClient.prototype.addRoom = function(ns_name, room) {
    var ns = this.newNamespace(ns_name);
    if (ns.room[room.name]) {
        console.error("Room name have already exist:", room.name);
        return;
    }
    room._module = ns.in(room.name);
    ns.room[room.name] = room;
}

SocketClient.prototype.closeRoom = function(ns_name, room_name) {
    var ns = this.newNamespace(ns_name);
    var room = ns.room[room_name];
    if (room) {
        room.disconnect();
    }
}

SocketClient.Namespace = function(name, server) {
    this.name = "/" + (name ? name : "");
    this._module = server.of(name);
    this.room = {};
};

SocketClient.Namespace.prototype.emit = function(event, message) {
    this._module.emit(event, message);
};

SocketClient.Room = function(name, namespace) {
    this.name = name || "";
    this._module = namespace.in(name);
};

// Override:
SocketClient.Room.prototype.onConnect = function() {console.warn("# SocketClient.Room.onConnect method need to be override");}
SocketClient.Room.prototype.onJoin = function() {console.warn("# SocketClient.Room.onJoin method need to be override");}
SocketClient.Room.prototype.onMessage = function() {console.warn("# SocketClient.Room.onMessage method need to be override");}
SocketClient.Room.prototype.onLeave = function() {console.warn("# SocketClient.Room.onLeave method need to be override");}
SocketClient.Room.prototype.onDisconnect = function() {console.warn("# SocketClient.Room.onDisconnect method need to be override");}

SocketClient.Room.prototype.emit = function(event, message) {
    this._module.emit(event, message);
};

SocketClient.Room.prototype.start = function(room, autoConnect) {
    this.socket = io(this.host);
    this.socket.on(SocketClient.Event.EVT_CONNECT, this.onConect.bind(this));
    this.socket.on(SocketClient.Event.EVT_OPEN, this.onOpen.bind(this));
    this.socket.on(SocketClient.Event.EVT_JOIN, this.onJoin.bind(this));
    this.socket.on(SocketClient.Event.EVT_MESSAGE, this.onMessage.bind(this));
    this.socket.on(SocketClient.Event.EVT_REFRESH, this.onRefresh.bind(this));
    this.socket.on(SocketClient.Event.EVT_LEAVE, this.onLeave.bind(this));
    this.socket.on(SocketClient.Event.EVT_DISCONNECT, this.onDisconnect.bind(this));
};
