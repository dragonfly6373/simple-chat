function SnackBar() {
    BaseTemplatedWidget.call(this);
    this.items = [];

    this.bind("click", this.close, this.closeButton);
    this.bind("click", this.onActionClick, this.actionButton);
}

__extend(BaseTemplatedWidget, SnackBar);

SnackBar.prototype.setup = function (message, actionTitle, actionHandler, icon, extraMessage, closable) {
    Dom.addClass(this.icon, icon || "checkbox-marked-circle");
    Dom.setInnerText(this.message, message);

    Dom.toggleClass(this.node(), "WithExtraMessage", extraMessage ? true : false);
    Dom.setInnerText(this.extraMessage, extraMessage || "");

    Dom.toggleClass(this.node(), "WithAction", actionTitle ? true : false);
    Dom.setInnerText(this.actionButton, actionTitle);
    this.actionHandler = actionHandler;

    Dom.toggleClass(this.node(), "Closable", closable ? true : false);
    this.closable = closable;
};
SnackBar.prototype.onActionClick = function () {
    if (!this.actionHandler) return;
    this.actionHandler();
    this.close();
};
SnackBar.prototype.close = function () {
    window.clearTimeout(this.closeTimeout);

    var node = this.node();
    node.style.top = "-" + Math.ceil(node.offsetHeight / Util.em()) + "em";
    node.style.opacity = "0";

    window.setTimeout(function () {
        node.parentNode.removeChild(node);
    }, 350);
};
SnackBar.show = function (message, action, actionHandler, icon, extraMessage, closable) {
    var snackBar = new SnackBar();
    snackBar.setup(message, action, actionHandler, icon, extraMessage, closable);
    Dom.addClass(snackBar.node(), "Floating");
    snackBar.node().style.position = "absolute";
    snackBar.node().style.opacity = "0";
    snackBar.node().style.visibility = "hidden";
    snackBar.node().style.transition = "top 0.3s ease, opacity 0.3s ease";
    snackBar.into(document.body);

    var height = Math.ceil(snackBar.node().offsetHeight / Util.em());
    var width = snackBar.node().offsetWidth;
    snackBar.node().style.top = "-" + height + "em";
    snackBar.node().style.left = Math.round((document.body.offsetWidth - width) / 2) + "px";

    window.setTimeout(function () {
        snackBar.node().style.visibility = "visible";
        snackBar.node().style.top = "1em";
        snackBar.node().style.opacity = "1";

        snackBar.closeTimeout = window.setTimeout(function () {
            snackBar.close();
        }, action ? 7000 : 5000);
    }, 10);
}
