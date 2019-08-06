function ChatContainer() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, ChatContainer);

ChatContainer.prototype.onAttached = function() {
    console.log("Attached container");

}
