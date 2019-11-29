function ChatWindow(room) {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, ChatWindow);

ChatWindow.prototype.onAttached = function() {
    console.log("# ChatWindow attached");
};
