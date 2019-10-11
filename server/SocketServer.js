var SecurityUtil = require("./service/SecurityUtil.js");
var Event = {
	EVT_CONNECT: "connect",
	EVT_OPEN: "open",
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
		console.log("# socket onConnect");
		this.emit(Event.EVT_CONNECT, "");
	}
	function onJoin(message) {
		console.log("# socket message");
		this.emit(Event.EVT_JOIN, {user_info: this._currentLogin});
	}
	function onMessage(message) {
		console.log("# socket onMessage", message);
		this.emit(Event.EVT_MESSAGE, {user_info: this._currentLogin, message: message});
	}
	function onLeave(message) {
		console.log("# socket message");
		this.emit(Event.EVT_LEAVE, {user_info: this._currentLogin});
	}
	function onDisconnect() {
		console.log("# socket onDisconnect");
		this.emit(Event.EVT_DISCONNECT, {user_info: this._currentLogin});
		this.disconnect();
	}
	return {
		start: function(socketIO) {
			socketIO.on(Event.EVT_CONNECT, function(socket) {
				var currentLogin = SecurityUtil.session.getCurrentLogin(socket.handshake);
				if (!currentLogin) {
					socket.disconnect();
					return;
				}
				socket._currentLogin = currentLogin;
				socket.emit(Event.EVT_OPEN, {account_info: currentLogin});
				socket.on(Event.EVT_JOIN, onJoin.bind(socket));
				socket.on(Event.EVT_MESSAGE, onMessage.bind(socket));
				socket.on(Event.EVT_LEAVE, onLeave.bind(socket));
				socket.on(Event.EVT_DISCONNECT, onDisconnect.bind(socket));
			});
		}
	};
})();

module.exports = SocketServer;
