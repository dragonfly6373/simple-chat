function MainContentWrapper() {
    BaseTemplatedWidget.call(this);
}
__extend(BaseTemplatedWidget, MainContentWrapper);

MainContentWrapper.prototype.onAttached = function() {
    console.log("MainContentWrapper -- attached");
}
