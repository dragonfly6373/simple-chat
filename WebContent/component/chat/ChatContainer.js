function ChatContainer() {
    BaseTemplatedWidget.call(this);
    this.socketIO = new SocketClient("127.0.0.1");
    // this.socketIO.open();
};
__extend(BaseTemplatedWidget, ChatContainer);

ChatContainer.prototype.onAttached = function() {
    console.log("Attached container");
    this.openNewChat("chat", "group1");
};

ChatContainer.prototype.openNewChat = function(room) {
    var group = this.socketIO.newRoom(room);
    var chatBox = new ChatWindow(group);
    chatBox.into(this.mainBody);
};
