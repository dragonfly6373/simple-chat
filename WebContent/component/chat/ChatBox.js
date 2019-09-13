function ChatBox() {
    BaseTemplatedWidget.call(this);
    this.socket = io();
    socket.on("user_info", function(msg) {
        console.log("session_info:", msg);
        socket.emit("join", {user_id: msg.session_id, user_name: user_name});
    });
    socket.on("join", function(msg) {
        thiz.appendMessage("join", msg.user_info, "has join to group");
    });
    socket.on("message", function(msg) {
        thiz.appendMessage("message", msg.user_info, msg.message);
    });
    socket.on("disconnect", function(msg) {
        thiz.appendMessage("disconnect", msg.user_info, "is disconnected");
    });
    this.bind("keypress", this.send.bind(this), this.txtInput);
    this.bind("click", this.send.bind(this), this.btnSend);
}
__extend(BaseTemplatedWidget, ChatBox);

ChatBox.prototype.onAttached = function() {
    console.log("ChatBox - Attached");

}

ChatBox.prototype.send = function() {
    var message = this.txtInput.value;
    if (!message || !message.length) return;
    this.socket.emit("message", message);
}

ChatBox.prototype.appendMessage = function(type, user, message) {
    var node = Dom.newDOMElement({
        _name: "hbox",
        class: type,
        _children: [
            {_name: "span", class: "FromUser", _text: user.name},
            {_name: "span", _text: message}
        ]
    });
    this.messageContainer.appendChild(node);
}