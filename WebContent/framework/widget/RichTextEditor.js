function RichTextEditor() {
    BaseWidget.call(this);

    var id = "richTextEditor" + (new Date().getTime());
    this.initialized = false;
    this.pendingContent = null;
    this.editorEventHandlers = {};
    this.contentCSS = "";

    this.bind("click", this.onSourceButtonClicked, this.editSourceButton);
}

__extend(BaseTemplatedWidget, RichTextEditor);

RichTextEditor.prototype.onAttached = function () {
    var thiz = this;
    var config = {
        toolbarGroups: [
            { name: 'basicstyles', groups: [ 'styles', 'basicstyles', 'colors', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align' ] },
            '/',
            { name: 'links', groups: [ 'links' ] },
            { name: 'insert', groups: [ 'insert' ] },
            { name: 'clipboard', groups: [ 'clipboard' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] }
        ],
        removeButtons: 'Styles,SelectAll,Cut,Copy,Paste,Flash,Smiley,SpecialChar,PageBreak,Iframe',
        //skin: 'moono-lisa',
        removePlugins: "elementspath,resize",
        allowedContent: true,
        entities_latin: false,
        entities_greek: false,
        contentsCss: ["/framework/webui/framework/js/widget/RichTextEditor-content.less"]
    };
    this.editor = CKEDITOR.replace(this.contentInput, config);

    this.editor.on("instanceReady", function() {
        var editable = thiz.editor.editable();

        editable.attachListener(editable, "input", function () {
            thiz.onSizeChanged();
        });

        editable.attachListener(editable, "keyup", function(event) {
            if (event.data.$.keyCode == DOM_VK_ESCAPE) {
                BaseWidget.handleClosableEscapeKey(event.data.$);
                return;
            }

            thiz.onSizeChanged();
        });

        window.setTimeout(function () {
            thiz.editSourceButton.parentNode.removeChild(thiz.editSourceButton);
            thiz.getEditorToolbar().appendChild(thiz.editSourceButton);

            thiz.initialized = true;

            if (thiz.pendingContent) {
                thiz.setContent(thiz.pendingContent);
                thiz.pendingContent = null;
            }

            window.setTimeout(function () {
                Dom.addClass(thiz.node(), "Initialized");
                Dom.emitEvent(RichTextEditor.EDITOR_INITIALIZED_EVENT_NAME, thiz.node(), {});

                thiz.editor.on("change", function () {
                    Dom.emitEvent(RichTextEditor.TEXT_CHANGE_EVENT_NAME, thiz.node(), {});
                });
            }, 100);
        }, 100);
    });

    Dom.addClass(this.node(), "ScrollerInstalled");

    function heightWatcher() {
        try {
            thiz.onSizeChanged();
        } finally {
            window.setTimeout(heightWatcher, 1000);
        }
    }

    window.setTimeout(heightWatcher, 500);

};
RichTextEditor.prototype.getFocusNode = function () {
    return this.editor.container;
};
RichTextEditor.prototype.setContent = function (content, delay) {
    if (!content) content = "";
    if (this.initialized) {
        this.editor.setData(content.html ? content.html : content);
        this.contentCSS = content.css || "";
        this.applyCSS(this.contentCSS);
        this.onSizeChanged();
    } else {
        this.pendingContent = content;
    }
};
RichTextEditor.prototype.getContent = function () {
    return this.editor.getData();
};
RichTextEditor.prototype.getContentStylesheet = function () {
    return this.contentCSS;
};
RichTextEditor.prototype.getTextContent = function () {
    return this.getContent().replace(/<[^>]*>/g, "");
};
RichTextEditor.prototype.onIframeInitialized = function (editor) {
    this.editor = editor;
    this.onSizeChanged(this.editor);
    this.initialized = true;
    Dom.emitEvent(RichTextEditor.EDITOR_INITIALIZED_EVENT_NAME, this.node(), {});

    var thiz = this;
    this.editor.on(RichTextEditor.TEXT_CHANGE_EVENT_NAME, function () {
        Dom.emitEvent(RichTextEditor.TEXT_CHANGE_EVENT_NAME, thiz.node(), {});
    });
};
RichTextEditor.prototype.getEditorFrame = function () {
    return this.node().querySelector(":scope iframe");
};
RichTextEditor.prototype.getEditorToolbar = function () {
    return this.node().querySelector(":scope .cke_top");
};
RichTextEditor.prototype.onSizeChanged = function () {
    var iframe = this.getEditorFrame();
    var size = {
        width: this.editor.document.$.body.scrollWidth,
        height: this.editor.document.$.body.scrollHeight + 5
    };

    if (size.height != this.lastContentHeight) {
        iframe.parentNode.style.height = Math.max(size.height, 200) + "px";
        this.updateScrolling("bringSelectionIntoView");

        this.lastContentHeight = size.height;
    }
};
RichTextEditor.prototype.getSelectionBoundingRect = function (dy) {
    try {
        var iframe = this.getEditorFrame();
        var selection = iframe.contentWindow.getSelection();
        var range = selection.getRangeAt(0);
        if (range.getClientRects().length > 0) {
            return range.getBoundingClientRect();
        } else {
            return range.startContainer.getBoundingClientRect();
        }
    } catch (e) {
        return null;
    }
};
RichTextEditor.CLASS_TOOLBAR_SHIFTED = "ToolbarShifted";
RichTextEditor.prototype.shiftToolbar = function (d, scrollPane) {
    var toolbar = this.getEditorToolbar();

    this.toolbarPadding.style.height = (toolbar.offsetHeight + 5) + "px";
    if (d > 0) {
        if (!Dom.hasClass(this.node(), RichTextEditor.CLASS_TOOLBAR_SHIFTED)) {
            var rect = scrollPane.getBoundingClientRect();
            var thisRect = this.node().getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();

            Dom.addClass(this.node(), RichTextEditor.CLASS_TOOLBAR_SHIFTED);
            toolbar.style.top = rect.top + "px";
            toolbar.style.left = (thisRect.left) + "px";
            toolbar.style.right = (bodyRect.width - thisRect.right) + "px";
        }
    } else {
        Dom.removeClass(this.node(), RichTextEditor.CLASS_TOOLBAR_SHIFTED);
        toolbar.style.top = "0px";
        toolbar.style.width = "auto";
    }
};
RichTextEditor.prototype.updateScrolling = function (bringSelectionIntoView) {
    var scrollPane = Dom.findUpward(this.node(), function (n) {
        return n.scrollHeight > n.offsetHeight;
    });

    if (!scrollPane) {
        this.shiftToolbar(0);
        return;
    }

    var r1 = this.node().getBoundingClientRect();
    var r2 = scrollPane.getBoundingClientRect();

    if (bringSelectionIntoView) {
        var sr = this.getSelectionBoundingRect();
        if (sr) {
            var safeCaretHeight = Util.em() * 3;

            var caretTop = sr.top + this.getEditorFrame().getBoundingClientRect().top;

            var d = caretTop + safeCaretHeight - (r2.top + r2.height);
            if (d > 0) {
                scrollPane.scrollTop += d;
            } else {
                d = r2.top + this.getEditorToolbar().offsetHeight - caretTop + safeCaretHeight;
                if (d > 0) {
                    scrollPane.scrollTop -= d;
                }
            }

            r1 = this.node().getBoundingClientRect();
        }
    }

    var dy = r2.top - r1.top;
    this.shiftToolbar(Math.max(dy - 1, 0), scrollPane);

    if (!this.scrollPaneWatched) {
        Dom.registerEvent(scrollPane, "scroll", function () {
            this.updateScrolling();
        }.bind(this), false);
        this.scrollPaneWatched = true;
    }
};
RichTextEditor.prototype.applyCSS = function (css) {
    if (this.styleNode) this.styleNode.parentNode.removeChild(this.styleNode);

    var doc = this.editor.document.$;

    var head = doc.head || doc.getElementsByTagName("head")[0];

    var style = doc.createElement("style");
    style.type = "text/css";

    if (style.styleSheet) {
        style.styleSheet.cssText = "";
    }

    head.appendChild(style);
    style.appendChild(doc.createTextNode(css));

    this.styleNode = style;
};
RichTextEditor.prototype.onSourceButtonClicked = function () {
    new RichTextEditorAdvancedDialog().callback(function (content) {
        if (content) {
            this.setContent(content);
            Dom.emitEvent(RichTextEditor.TEXT_CHANGE_EVENT_NAME, this.node(), {});
        }
    }.bind(this)).open({
        html: this.getContent(),
        css: this.getContentStylesheet()
    });
};

RichTextEditor.TEXT_CHANGE_EVENT_NAME = "text-change";
RichTextEditor.EDITOR_INITIALIZED_EVENT_NAME = "p:ItemInitialized";
