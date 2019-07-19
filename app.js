var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var session = require('express-session');
var io = require('socket.io')(http);
// var redisAdapter = require('socket.io-redis');

var properties = require('./properties.js');
// var router = require('./routes.js');
var controller = require('./controller/chat-controller.js');
var serviceBuilder = require('./service/ServiceBuilder.js');

app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chat', (req, res) => {
	console.log("join chat room");
	res.sendFile(path.join(__dirname, 'public/ChatClient.html'));
});

app.use('/rest', serviceBuilder.build(controller));
app.use(express.static(path.join(__dirname, 'public')));

var chatGroup = {};
io.on("connect", function(socket) {
	socket.emit("user_info", {session_id: socket.id});
	socket.on("join", function(userInfo) {
		console.log("new user join:", userInfo);
		chatGroup[socket.id] = {socket: socket, user_info: userInfo};
		//io.emit("join", {user_info: userInfo});
		socket.broadcast.emit("join", {user_info: userInfo});
	});

	socket.on("message", function(msg) {
		io.emit("message", {user_info: chatGroup[socket.id].user_info, message: msg});
	});

	socket.on("disconnect", function() {
		io.emit("disconnect", {user_info: chatGroup[socket.id].user_info, message: ""});
	});
});

http.listen(properties.PORT, () => {
	console.log("server is starting on http://127.0.0.1:" + properties.PORT);
});

