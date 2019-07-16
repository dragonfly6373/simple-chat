
document.addEventListener("DOMContentLoaded", function() {
	var form = document.getElementById("frmChatBox");
	var inputText = document.getElementById("txtIn");
	var messageContainer = document.getElementById("messages");
	form.addEventListener("submit", function(event) {
		event.preventDefault();
		socket.emit("message", inputText.value);
		inputText.value = "";
		return false;
	});
	var user_name = prompt("User Name");
	var socket = io();
	socket.on("user_info", function(msg) {
		console.log("session_info:", msg);
		socket.emit("join", {user_id: msg.session_id, user_name: user_name});
	});
	socket.on("join", function(msg) {
		appendMessage("join", msg.user_info, "has join to group");
	});
	socket.on("message", function(msg) {
		appendMessage("message", msg.user_info, msg.message);
	});
	socket.on("disconnect", function(msg) {
		appendMessage("disconnect", msg.user_info, "is disconnected");
	});

	function appendMessage(type, user, message) {
		var node = document.createElement("li");
		if ((" " + node.className + " ").indexOf(" " + type + " ") == -1) node.className += " " + type;
		var userInfo = document.createElement("span");
		userInfo.innerText = user.user_name;
		node.appendChild(userInfo);
		node.appendChild(document.createTextNode(message));
		messageContainer.appendChild(node);
	}
});

