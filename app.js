var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var redisAdapter = require('socket.io-redis');

var CONTEXT = require('server');
var properties = CONTEXT.properties;

var db = CONTEXT.mongodb;
var serviceBuilder = CONTEXT.serviceBuilder;

var controller = CONTEXT.controller;
var userController = controller.user;
var chatController = controller.chat;

db.connect();
console.log("DB", typeof(db), db);

app.use(cookieParser());
app.use(session({secret: 'secret is secret', cookie: {maxAge: 60000}}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'WebContent/public')));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chat', (req, res) => {
	console.log("join chat room");
	res.sendFile(path.join(__dirname, 'public/ChatClient.html'));
});

var userApi = express.Router();
app.use('/user', userApi);
serviceBuilder.register('user', userApi, userController);

var chatApi = express.Router();
app.use('/chat', chatApi);
serviceBuilder.register('chat', chatApi, chatController);

app.get('/registry.js', (req, res) => {
	res.send("window._registry = " + JSON.stringify(serviceBuilder.getAPIs()) + ";\nCommonNet.initServices(window._registry);");
});

app.use(function(req, res, next) {
	res.status(404).send("Oop! Page not be found");
});

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

