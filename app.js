var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var redisAdapter = require('socket.io-redis');

var db = require('./db/MongoDb');
var User = require('./db/model/User');
var router = require('./routes');

db.connect('mongodb://localhost/chat-room');
db.insert(User, {name: "ABC", email: "abc@gmail.com", gender: User.Gender.Male}, function(data) {
	console.log("Insert data:", data);
});

app.get('/', (req, res, next) => {
	res.send("<h1>Hello World!</h1>");
});

app.get('/chat', (req, res) => {
	console.log("join chat room");
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/rest', router);
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

http.listen(3000, () => {
	console.log("server is starting on http://127.0.0.1:3000");
});

