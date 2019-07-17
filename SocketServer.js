var Event = {
	EVT_CONNECT: "connect",
	EVT_JOIN: "join",
	EVT_MESSAGE: "message",
	EVT_LEAVE: "leave",
	EVT_DISCONNECT: "disconnect"
};
var SocketServer = (function() {
	var _namespace = {};
	var _group = {};
	var _session = {};
	function onConnect(message) {
		this.emit(Event.EVT_CONNECT, "");
	}
	function onJoin(message) {
		this.emit(Event.EVT_JOIN, "");
	}
	function onMessage(message) {
		this.emit(Event.EVT_MESSAGE, message);
	}
	function onLeave(message) {
		this.emit(Event.EVT_LEAVE, "");
	}
	function onDisconnect() {
		this.emit(Event.EVT_DISCONNECT);
	}
	return {
		start: function(io) {
			io.on("connect", function(socket) {
				socket.on("connect", onConnect.bind(socket));
				socket.on("join", onJoin.bind(socket));
				socket.on("message", onMessage.bind(socket));
				socket.on("leave", onLeave.bind(socket));
				socket.on("disconnect", onDisconnect.bind(socket));
			};
		},
	};
}

module.exports = SocketServer;
