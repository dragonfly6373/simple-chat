var Event = {
	EVT_CONNECT: "connect",
	EVT_JOIN: "join",
	EVT_MESSAGE: "message",
	EVT_LEAVE: "leave",
	EVT_DISCONNECT: "disconnect"
};
/**
io.on("connect", function(socket) {
-       socket.emit("user_info", {session_id: socket.id});
-       socket.on("join", function(userInfo) {
-               console.log("new user join:", userInfo);
-               chatGroup[socket.id] = {socket: socket, user_info: userInfo};
-               //io.emit("join", {user_info: userInfo});
-               socket.broadcast.emit("join", {user_info: userInfo});
-       });
-
-       socket.on("message", function(msg) {
-               io.emit("message", {user_info: chatGroup[socket.id].user_info, message: msg});
-       });
-
-       socket.on("disconnect", function() {
-               io.emit("disconnect", {user_info: chatGroup[socket.id].user_info, message: ""});
-       });
-});
*/
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
		this.emit(Event.EVT_JOIN, "");
	}
	function onMessage(message) {
		console.log("# socket onMessage");
		this.emit(Event.EVT_MESSAGE, message);
	}
	function onLeave(message) {
		console.log("# socket message");
		this.emit(Event.EVT_LEAVE, "");
	}
	function onDisconnect() {
		console.log("# socket onDisconnect");
		this.emit(Event.EVT_DISCONNECT);
	}
	return {
		start: function(io) {
			io.on("connect", function(socket) {
				socket.emit("user_info", {session_id: socket.id});
				socket.on("connect", onConnect.bind(socket));
				socket.on("join", onJoin.bind(socket));
				socket.on("message", onMessage.bind(socket));
				socket.on("leave", onLeave.bind(socket));
				socket.on("disconnect", onDisconnect.bind(socket));
			});
		}
	};
})();

module.exports = SocketServer;
