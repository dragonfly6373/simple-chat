function ChatBox() {
    BaseTemplatedWidget.call(this);
    var thiz = this;
    this.bind("keypress", function(event) {
        if (event.keyCode != 13) return;
        thiz.send(thiz.txtInput.value);
        thiz.txtInput.value = "";
    }, this.txtInput);

    this.bind("click", function() {
        var msg = thiz.txtInput.value;
        if (!msg || !msg.length) return;
        thiz.send(thiz.txtInput.value);
        thiz.txtInput.value = "";
    }, this.btnSend);
}
__extend(BaseTemplatedWidget, ChatBox);

ChatBox.prototype.onAttached = function() {
    console.log("ChatBox - Attached");
    this.initChatting();
}

ChatBox.prototype.initChatting = function() {
    var thiz = this;
    this.socket = io();
    this.socket.on("open", function(msg) {
        console.log("# open connection:", msg);
        thiz.socket.emit("join", {user_id: APP_CONTEXT.CURRENT_LOGIN.id, user_name: APP_CONTEXT.CURRENT_LOGIN.name});
    });
    this.socket.on("join", function(msg) {
        console.log("# new user join chat", msg);
        thiz.appendMessage("join", msg.user_info, "has join to group");
    });
    this.socket.on("message", function(msg) {
        console.log("# new message come", msg);
        thiz.appendMessage("message", msg.user_info, msg.message);
    });
    this.socket.on("disconnect", function(msg) {
        console.log("# user disconnected", msg);
        thiz.appendMessage("disconnect", msg.user_info, "is disconnected");
    });
}

ChatBox.prototype.send = function(message) {
    if (!message || !message.length) return;
    this.socket.emit("message", message);
}

ChatBox.prototype.appendMessage = function(type, user, message) {
    console.log("# appendMessage:", message);
    var node = Dom.newDOMElement({
        _name: "hbox",
        class: type,
        _children: [
            {_name: "span", class: "FromUser", _text: user ? user.name : ""},
            {_name: "span", _text: message}
        ]
    });
    this.messageContainer.appendChild(node);
}