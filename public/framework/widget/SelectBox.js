function SelectBox() {
    var thiz = this;
    this.name = "selectBox";
    this.mode = SelectBox.MODE_CHECK;
    this.direction = SelectBox.DIRECTION_ROW;
    this.multipleSelect = false;
    this.displayStatus = SelectBox.DISPLAY_STATUS_JOINTEXT;
    this.optionSelectAll = false;
    this.optionSelectAllText = "Select All";
    this.filterBox = false;
    this.filterHintText = "input keyword";
    /**
    // this.getConfig = function() {
    //     return {
    //         name: "name_string",
    //         mode: SelectBox.MODE_DROPDOWN,               // "dropdown" | "check",
    //         direction: SelectBox.DIRECTION_ROW,          // "row" | "column",
    //         multipleSelect: true,                        // true | false,
    //         displayStatus: SelectBox.DISPLAY_STATUS_JOINTEXT,      // "join_text" | "total"
    //         optionSelectAll: true,                       // true | false,
    //         optionSelectAllText: "Select All",
    //         filterBox: true,                             // true | false
    //         filterHintText: "input keyword"
    //     };
    // }
    // this.getData = function() {
    //     return [
    //         {id: 1, name: "ABC", description: "description", active: true},
    //         {id: 2, name: "MOKA", description: "descript", active: false},
    //         {id: 3, name: "LATTE", description: "Latte Coffee", active: false}
    //     ]
    // }
    // this.parseData = function(object) {
    //     return {
    //         value: object.id,
    //         text: object.name,
    //         checked: true,      // true | false,
    //         role: "",           // "option" | "handle",
    //         type: "",           // "selectall" | "seperator"
    //     }
    // }
    // this.getName = function() { return "name_string"; }
    // this.getMultipleSelect = function() { return true; }
    // this.getMode = function() { return "dropdown" || "check" }
    // this.filter = function(data, keyword) { if (data.name.startsWith(keyword)) return true; else return false; }
    // this.getConfigs = function() {return {
    //      name: "name",
    //      mode: SelectBox.MODE_DROPDOWN,
    //      direction: SelectBox.DIRECTION_COLUMN,
    //      multipleSelect: true|false,
    //      displayStatus: SelectBox.DISPLAY_STATUS_JOINTEXT,
    //      optionSelectAll: true|false,
    //      optionSelectAllText: "-- Select All --",
    //      filterBox: true,
    //      filterHintText: "Input keyword"
    //  }}
    */
    BaseTemplatedWidget.call(this);

    this.popupContainer.onHide = function() {
        if (thiz.mode == SelectBox.MODE_DROPDOWN) {
            thiz._setSelectedStatus();
        }
    }
    this.bind("click", function() {
        if (this.popupContainer.isVisible()) {
            this.popupContainer.hide();
            return;
        }
        this.popupContainer.show(this.statusBox, "left-inside", "top", 0, 5, "autoFlip");
        setTimeout(function() {
            this._focusElement(Dom.findFirstChildWithClass(this.optionBox, "OptionContainer"));
        }.bind(this), 20);
    }, this.statusBox);
}
__extend(BaseTemplatedWidget, SelectBox);

SelectBox.MODE_DROPDOWN = "dropdown";
SelectBox.MODE_CHECK = "check";
SelectBox.DIRECTION_ROW = "row";
SelectBox.DIRECTION_COLUMN = "column";
SelectBox.DISPLAY_STATUS_JOINTEXT = "join_text";
SelectBox.DISPLAY_STATUS_TOTAL = "total";
SelectBox.OPTION_ROLE_OPTION = "option";
SelectBox.OPTION_ROLE_HANDLE = "handle";
SelectBox.HANDLE_TYPE_SELECTALL = "selectall";
SelectBox.HANDLE_TYPE_SEPERATOR = "seperator";

SelectBox.prototype.setContentFragment = function(fragment) {
    var options = [];
    for (var i = 0; i < fragment.childNodes.length; i ++) {
        var node = fragment.childNodes[i];
        if (!node || node.nodeType != Node.ELEMENT_NODE) continue;
        var role = node.localName;
        if (role == "option") {
            options.push(node);
        }
    }
    this.setup(options);
}

SelectBox.prototype.setup = function(options) {
    this.data = this.getData ? this.getData() : [];
    this.options = this.parseData ? this._parseData(this.data) : this._parseOptions(options);
    this.name = Dom.getAttributeAsString(this.node(), "anon-id", this.name);
    // Read config from attributes
    this.multipleSelect = Dom.getAttributeAsBoolean(this.node(), "multiple-select", this.multipleSelect);
    this.displayStatus = Dom.getAttributeAsString(this.node(), "display-status", this.displayStatus);
    this.mode = Dom.getAttributeAsString(this.node(), "mode", (this.options.length > 3 ? SelectBox.MODE_DROPDOWN : this.mode));
    this.direction = this.mode == SelectBox.MODE_DROPDOWN ? SelectBox.DIRECTION_COLUMN : Dom.getAttributeAsString(this.node(), "direction", this.direction);
    if (this.getConfigs) {
        var config = this.getConfigs();
        if (config.name) this.name = config.name;
        if (config.mode) this.mode = config.mode;
        if (config.direction) this.direction = config.direction;
        if (config.multipleSelect) this.multipleSelect = config.multipleSelect;
        if (config.displayStatus) this.displayStatus = config.displayStatus;
        if (config.optionSelectAll) this.optionSelectAll = config.optionSelectAll;
        if (config.optionSelectAllText) this.optionSelectAllText = config.optionSelectAllText;
        if (config.filterBox) this.filterBox = config.filterBox;
        if (config.filterHintText) this.filterHintText = config.filterHintText;
    }
    if (this.getName) this.name = this.getName();
    if (this.getMultipleSelect) this.multipleSelect = this.getMultipleSelect();
    // if (this.getDisplayStatus) this.displayStatus = this.getDisplayStatus();
    if (this.getMode) this.mode = this.getMode();
    if (this.mode == SelectBox.MODE_DROPDOWN) {
        this.bind("click", function(event) {
            if (this.multipleSelect == false && event.target.tagName == "INPUT") {
                this.popupContainer.close();
            }
            if (this.multipleSelect == true && event.target.tagName == "INPUT") {
                var optionAll = Dom.findChild(this.optionBox, {eval: function(node) {
                        return (Dom.getAttributeAsString(node, "role") == SelectBox.OPTION_ROLE_HANDLE) && (Dom.getAttributeAsString(node, "handle") == SelectBox.HANDLE_TYPE_SELECTALL)
                    }
                }, true);
                if (event.target === optionAll) {
                    this.setAllOptionSelected(optionAll.checked);
                }
                this._setSelectedStatus();
                this.onSelectionChanged(true);
            }
        }, this.optionBox);
    }
    this._install();
}

SelectBox.prototype._install = function() {
    Dom.addClass(this.optionBox, this.direction == SelectBox.DIRECTION_ROW ? "HBox" : "VBox");
    Dom.addClass(this.node(), this.mode);
    this.optionBox.innerHTML = "";
    if (this.filterBox) {
        var filterBox = this._createFilterBox();
        this.bind("change", this._onKeywordInput.bind(this), filterBox);
        Dom.append(filterBox, this.optionBox);
        Dom.append(this._createSeperator(), this.optionBox);
    }
    if (this.optionSelectAll) {
        Dom.append(this._createOptionSelectAll(), this.optionBox);
        Dom.append(this._createSeperator(), this.optionBox);
    }
    for (var i = 0; i < this.options.length; i++) {
        var option = this.options[i];
        if (option.role == SelectBox.OPTION_ROLE_HANDLE) {
            if (option.type == SelectBox.HANDLE_TYPE_SELECTALL) {
                if (this.multipleSelect) {
                    var container = this._createOptionElement(option, "checkbox");
                    this.bind("mouseenter", this._handleMouseEnter, container);
                    Dom.append(container, this.optionBox);
                }
            } else if (option.type == SelectBox.HANDLE_TYPE_SEPERATOR) {
                Dom.append(this._createSeperator(), this.optionBox);
            }
        } else {
            var container = this._createOptionElement(option, this.multipleSelect ? "checkbox" : "radio");
            this.bind("mouseenter", this._handleMouseEnter, container);
            Dom.append(container, this.optionBox);
        }
    }
    if (this.mode == SelectBox.MODE_DROPDOWN) {
        this.popupContainer.setContentFragment(this.optionBox);
        this.bind("keypress", this._handleKeyPress.bind(this), this.optionBox);
        this._setSelectedStatus();
    }
}

SelectBox.prototype.onSelectionChanged = function(fromUserAction) {
    Dom.emitEvent("p:SelectionChanged", this.node(), {});
    if (this._options && this._options.onSelectionChanged) {
        this._options.onSelectionChanged(fromUserAction);
    }
}

SelectBox.prototype.setAllOptionSelected = function(selected) {
    var options = Dom.findChildrenByTagName(this.optionBox, "input", true);
    for (var i = 0; i < options.length; i++) {
        options[i].checked = selected;
    }
}

SelectBox.prototype.isAllOptionSelected = function() {
    var options = this.optionBox.querySelectorAll("input[type=checkbox]");
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        if (Dom.getAttributeAsString(opt, "role") == SelectBox.OPTION_ROLE_HANDLE) continue;
        if (!opt.checked) return false;
    }
    return true;
}

SelectBox.prototype.countSelectedOption = function() {
    return Dom.findChildren(this.optionBox, {
        eval: function(node) {
            return (node.tagName == "input") && (Dom.getAttributeAsString(node, "role") != SelectBox.OPTION_ROLE_HANDLE) && node.checked;
        }
    }, true).length;
}

SelectBox.prototype.getValues = function() {
    var options = Dom.getTags("input", this.optionBox);
    var result = [];
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.checked == true && (Dom.getAttributeAsString(option, "role") != SelectBox.OPTION_ROLE_HANDLE)) result.push(option.value);
    }
    return result;
}

SelectBox.prototype.getValue = function() {
    var options = Dom.getTags("input", this.optionBox);
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.checked == true && (Dom.getAttributeAsString(option, "role") != SelectBox.OPTION_ROLE_HANDLE)) return option.value;
    }
    return null;
}

SelectBox.prototype.getSelectedData = function() {
    var options = Dom.getTags("input", this.optionBox);
    var result = [];
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.checked == true && (Dom.getAttributeAsString(option, "role") != SelectBox.OPTION_ROLE_HANDLE)) result.push(option._data);
    }
    return result;
}

SelectBox.prototype.getSelectedOptionText = function() {
    var options = Dom.getTags("input", this.optionBox);
    var result = [];
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.checked == true && (Dom.getAttributeAsString(option, "role") != SelectBox.OPTION_ROLE_HANDLE)) result.push(option.nextSibling.textContent);
    }
    return result;
}

SelectBox.prototype.setValueSelected = function(value, selected) {
    var options = Dom.getTags("input", this.optionBox);
    if (!this.multipleSelect) {
        for (var i in options) {
            options[i].checked = false;
        }
    }
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.value == value) {
            option.checked = selected;
            break;
        }
    }
    this._setSelectedStatus();
}

SelectBox.prototype.onDetached = function () {
    document.body.removeChild(this.popupContainer.popupContainer);
}

SelectBox.prototype._setSelectedStatus = function() {
    var status = "";
    var selectedText = this.getSelectedOptionText();
    var optionAll = Dom.findChild(this.optionBox, {eval: function(node) {
            return (Dom.getAttributeAsString(node, "role") == SelectBox.OPTION_ROLE_HANDLE) && (Dom.getAttributeAsString(node, "handle") == SelectBox.HANDLE_TYPE_SELECTALL)
        }
    }, true);
    if (this.multipleSelect) {
        if (this.isAllOptionSelected() && optionAll) {
            optionAll.checked = true;
            var optionGroup = Dom.findParentWithClass(optionAll, "OptionContainer");
            var label = Dom.getTag("label", optionGroup);
            status = label.textContent + String.format("({0})", selectedText.length);
        } else {
            if (optionAll) optionAll.checked = false;
            if (selectedText > 1) status = String.format("{0} items are selected", selectedText.length);
            else status = String.format("{0} item is selected", selectedText.length);
        }
    } else {
        status = selectedText[0];
    }
    if (this.displayStatus != SelectBox.DISPLAY_STATUS_TOTAL) {
        status = (optionAll && optionAll.checked) ? optionAll.nextSibling.textContent : (selectedText.length ? selectedText.join(", ") : "0 item is selected");
        this.statusBox.title = status;
    }
    this.statusItem.textContent = status;
}

SelectBox.prototype._parseData = function(data) {
    var options = [];
    for (var i = 0; i < data.length; i++) {
        var item = this.parseData(data[i]);
        item._data = data[i];
        options.push(item);
    }
    return options;
}

SelectBox.prototype._parseOptions = function(domArray) {
    var options = [];
    for (var i = 0; i < domArray.length; i++) {
        var element = domArray[i];
        var opt = {};
        opt.value = element.value;
        opt.text = Dom.getAttributeAsString(element, "text", "");
        opt.checked = Dom.getAttributeAsBoolean(element, "checked", false);
        opt.role = Dom.getAttributeAsString(element, "role", "option");
        opt.type = Dom.getAttributeAsString(element, "type", "");
        opt._data = element;
        options.push(opt);
    }
    return options;
}

SelectBox.prototype._createOptionElement = function(option, type) {
    var container = document.createElement("hbox");
    Dom.addClass(container, "OptionContainer Item");
    var selectItem = document.createElement("input");
    selectItem.type = type;
    selectItem.value = option.value;
    selectItem.checked = option.checked;
    selectItem.id = this.name + "_" + widget.random();
    selectItem.name = this.name;
    selectItem.setAttribute("role", option.role);
    selectItem.setAttribute("handle", option.type);
    selectItem._data = option._data;

    var label = document.createElement("label");
    label.textContent = option.text;
    label.setAttribute("for", selectItem.id);
    Dom.append(selectItem, container);
    Dom.append(label, container);
    return container;
}

SelectBox.prototype._createFilterBox = function() {
    var container = Dom.newDOMElement({
        _name: "input",
        type: "text",
        id: this.name + "_" + widget.random(),
        placeholder: this.filterHintText,
        role: "handle",
        handle: "filter"
    });
    var icon = Dom.newDOMElement({
        _name: "icon",
        class: "magnify"
    })
    return container;
}

SelectBox.prototype._createOptionSelectAll = function() {
    var container = document.createElement("hbox");
    Dom.addClass(container, "OptionContainer Item");
    var selectItem = document.createElement("input");
    selectItem.type = "checkbox";
    selectItem.value = "";
    selectItem.checked = false;
    selectItem.id = this.name + "_" + widget.random();
    selectItem.name = this.name;
    selectItem.setAttribute("role", SelectBox.OPTION_ROLE_HANDLE);
    selectItem.setAttribute("handle", SelectBox.HANDLE_TYPE_SELECTALL);
    var label = document.createElement("label");
    label.textContent = this.optionSelectAllText != "" ? "Select All" : this.optionSelectAllText;
    label.setAttribute("for", selectItem.id);
    label.setAttribute("flex", 1);
    Dom.append(selectItem, container);
    Dom.append(label, container);
    return container;
}

SelectBox.prototype._createSeperator = function() {
    var hr = Dom.newDOMElement({
        _name: "hr",
        disabled: true
    });
    return hr;
}

SelectBox.prototype._findByData = function(node, keyword) {
    return this.filter(node._data, keyword);
}

SelectBox.prototype._findByOptionText = function(node, keyword) {
    var label = Dom.getTag("label", node);
    return label.textContent.startsWith(keyword);
}

SelectBox.prototype._onKeywordInput = function(event) {
    var keyword = event.target.value;
    var options = Dom.findChildrenWithClass(this.optionBox, "OptionContainer", false);
    for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (Dom.getAttributeAsString(option, "role") != SelectBox.OPTION_ROLE_HANDLE) {
            if (this.filter) {
                if (!this._findByData(option, keyword)) Dom.addClass(option, "Hidden");
            } else if (!this._findByOptionText(option, keyword)) Dom.addClass(option, "Hidden");
        }
    }
}

SelectBox.prototype._handleMouseEnter = function(event) {
    var node = event.target;
    var currentFocus = Dom.findChildWithClass(parent, "Focus");
    if (node != currentFocus) {
        this._focusElement(node);
    }
}

SelectBox.prototype._handleKeyPress = function(event) {
    var currentFocus = Dom.findChildWithClass(this.optionBox, "Focus");
    switch (event.keyCode) {
        case DOM_VK_SPACE:
        case 0:
            // var element = Dom.getTag("input", currentFocus);
            // element.checked = !element.checked;
        break;
        case DOM_VK_UP:
            var nextFocus = currentFocus ? currentFocus.previousSibling : Dom.findFirstChildWithClass(this.optionBox, "OptionContainer");
            if (nextFocus) {
                Dom.cancelEvent(event);
                this._focusElement(nextFocus);
            }
        break;
        case DOM_VK_DOWN:
            var nextFocus = currentFocus ? currentFocus.nextSibling : Dom.findFirstChildWithClass(this.optionBox, "OptionContainer");
            if (nextFocus) {
                Dom.cancelEvent(event);
                this._focusElement(nextFocus);
            }
        break;
        default:
        break;
    }
}

SelectBox.prototype._focusElement = function(element) {
    var currentFocus = Dom.findChildWithClass(this.optionBox, "Focus");
    if (currentFocus) {
        Dom.removeClass(currentFocus, "Focus");
    }
    Dom.addClass(element, "Focus");
    Dom.getTag("input", element).focus();
}
