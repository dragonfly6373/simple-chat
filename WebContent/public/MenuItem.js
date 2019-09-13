function MenuItem() {
    BaseTemplatedWidget.call(this);
    this.role = "item"; // item | group
    this.mode = "pull-left"; // pull-left | pull-down | visible
}
__extend(BaseTemplatedWidget, MenuItem);

MenuItem.prototype.handler = function() {

}

MenuItem.prototype.setItems = function(items) {
    this._children = items;
    // re-install menu-item
}
