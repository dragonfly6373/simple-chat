
function __extend() {
    var __base = arguments[0];
    var sub = arguments[1];

    sub.prototype = Object.create(__base.prototype);
    sub.prototype.constructor = sub;
    sub.__base = __base;

    for (var i = 2; i < arguments.length; i ++) {
        var f = arguments[i];
        sub.prototype[f.name] = f;
    }

    sub.prototype.__pathPrefix = __guessPrefix();

    return sub;
}
function __isSubClassOf(sub, base) {
    if (!sub.__base) return false;
    return sub.__base === base || __isSubClassOf(sub.__base, base);
}
function __isAssignableFrom(sub, base) {
    return sub === base || __isSubClassOf(sub, base);
}
function __base(object) {
    return object.constructor.__base.prototype;
}
function __getFrameworkPrefix() {
    return window.FRAMEWORK_PATH || "framework/";
};
function __getCurrentScriptPath() {
    if (window.__currentScriptPath) return window.__currentScriptPath;
    var scripts = document.getElementsByTagName("script");
    var src = scripts[scripts.length - 1].getAttribute("src");

    return src;
};
function __guessPrefix() {
    var src = __getCurrentScriptPath();
    return src.replace(/\/[^\/]+\.js$/, "/");
}

window.FRAMEWORK_PATH = __guessPrefix().replace(/widget\/$/, "");

//support function.name in IE9+
if (!(function f() {}).name) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
            // For better performance only parse once, and then cache the
            // result through a new accessor for repeated access.
            Object.defineProperty(this, 'name', { value: name });
            return name;
        }
    });
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    };
}
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
if (!String.prototype.toUpperCaseAt) {
    String.prototype.toUpperCaseAt = function(index) {
        if (this.length <= index) return this;
        return (index > 0 ? this.substring(0, index) : "") + this.charAt(index).toUpperCase() + this.substring(index + 1);
    };
};

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                 console.log(obj);
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

function ie() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') != -1) {
        return parseInt(ua.split('msie')[1], 10);
    }
    if (ua.indexOf('trident') != -1) {
        return 11;
    }
    return false;
}

var widget = {};
widget.random = function() {
    return "" + new Date().getTime() + "_" + Math.round(10000 * Math.random());
};
widget.STATIC_BASE = "";
widget.LOADING = "Loading...";
widget.CACHE_RANDOM = widget.random();
widget.get = function(foo) {
    if (typeof (foo) == "string") return document.getElementById(foo);
    if (foo && foo.nodeType) return foo;
    return null;
};
widget.getId = function (node) {
    var id = node.getAttribute("id");
    if (!id) {
        id = "node_" + widget.random();
        node.setAttribute("id", id);
        try {
            node.id = id;
        } catch (e) {}
    }

    return id;
};
widget.evaluate = function(object, context) {
    if (typeof (object) == "function") {
        return object.apply(context);
    }
    return object;
};
widget.registerEvent = function (target, event, handlerName, capture) {
    Dom.registerEvent(target, event, function (e) {
        var t = Dom.getTarget(e);
        var node = Dom.findUpward(t, function (n) {
            return n._widget;
        });
        if (!node) return;
        var f = node._widget[handlerName];
        if (!f) return;
        f.apply(node._widget, [e]);
    }, capture);
};
widget.Util = function() {
    var TEMPLATE_CACHE = {};
    var WIDGET_STYLE_CACHE = {};
    var lessParserConfig = {
            paths: [__getFrameworkPrefix(), __getFrameworkPrefix() + "style/"]
    };
    var _processTemplate = function(dolly, namingContext, templateName) {
        dolly.removeAttribute("id");
        //dolly.style.display = "block";

        var anonIdToIdMap = {};

        widget.Util.performAutoBinding(dolly, namingContext, templateName);

        Dom.doOnChildRecursively(dolly, {
            eval: function(n) {
                return n.getAttribute && n.getAttribute("anon-id");
            }
        }, function(n) {
            var id = n.getAttribute("anon-id");

            if (namingContext) {
                namingContext[id] = n;
            }
            n.removeAttribute("anon-id");

            var newId = id + widget.random();
            n.setAttribute("id", newId);
            n.id = newId;
            anonIdToIdMap[id] = newId;
            Dom.addClass(n, "AnonId_" + id);
            Dom.addClass(n, "AnonId_" + (templateName ? (templateName + "_") : "") + id);
        });
        Dom.doOnChildRecursively(dolly, {
            eval: function(n) {
                return n.getAttribute;
            }
        }, function(n) {
            if (n.getAttribute) {
                var href = n.getAttribute("href");
                if (href && href.match(/^#(.+)$/)) {
                    var id = RegExp.$1;
                    if (anonIdToIdMap[id]) {
                        n.setAttribute("href", "#" + anonIdToIdMap[id]);
                    }
                }

                var ffor = n.getAttribute("for");
                if (ffor && anonIdToIdMap[ffor]) {
                    n.setAttribute("for", anonIdToIdMap[ffor]);
                }
            }
        });
    };
    var _processTemplateStyleSheet = function (html, prefix, templateName) {

        return html.replace(/(<style[^>]*>)([^<]+)(<\/style>)/g, function (zero, start, content, end) {

            if (WIDGET_STYLE_CACHE[templateName]) return "";

            var css = content.replace(/([\r\n ]+)([^\{\}\$;]+)\{/g, function (zero, leading, selectors) {
                selectors = selectors.replace(/@this/gi, "body " + prefix);
                selectors = selectors.replace(/(\.widget_[^\r\n\,]+ )@([a-z])/gi, "$1 .AnonId_$2");
                if (!selectors.match(/^[ \t]*@media /)) {
                    selectors = selectors.replace(/@([a-z])/gi, ".AnonId_" + (templateName + "_") + "$1");
                }
                selectors = selectors.replace(/[ \r\n\t]\,[ \r\n\t]+/g, ",");
                if (!selectors.match(/^[ \t]*body[ \.\[:]/)
                        && !selectors.match(/^[ \t]*\&/)
                        && !selectors.match(/^[ \t]*@media /)
                        && !selectors.match(/^[ \t]*#sys-/)) {
                    selectors = prefix + " " + selectors.replace(/\,/g, ",\n" + prefix + " ");
                }

                var modified = leading + selectors + "{";

                return modified;
            });
            var includes = "";
            includes += "@import \"" + __getFrameworkPrefix() + "style/layout-includes.less\";\n";
            css = css.replace(/\$([a-z0-9_]+)/g, "@$1");
            css = includes + css;
            if (less) {
                less.render(css, lessParserConfig).then(function (output) {
                    widget.Util.insertGlobalStyleSheet(output.css, templateName);
                }).catch(function (e) {
                    console.error(e);
                });
            }
            WIDGET_STYLE_CACHE[templateName] = true;
            return "";
        });
    };
    var _toTemplateNode = function (path, html, namingContext) {
        if (html) {
            html = html.replace(/<ui:([^>]+)\/>/gi, function (all, attr) {
                return "<ui:" + attr + "></ui:Dummy>";
            }).replace(/<ui:([a-zA-Z0-9]+)/gi, function (all, name) {
                return "<ui type=\"" + name + "\"";
            }).replace(/<\/ui:([a-zA-Z0-9]+)/gi, function (all, name) {
                return "</ui";
            });
        }
        var div = document.createElement("div");
        var templateName = path.replace(/[^a-z0-9]+/gi, "_");
        var className = "DynamicTemplate" + templateName;
        var processedHtml = _processTemplateStyleSheet(html, "." + className, templateName);
        try {
            div.innerHTML = processedHtml;
        } catch (e) {
            console.log("Bad HTML: " + html);
            throw e;
        }
        var firstElement = null;
        for (var i = 0; i < div.childNodes.length; i ++) {
            var e = div.childNodes[i];
            if (e && e.nodeType == Node.ELEMENT_NODE) {
                firstElement = e;
                break;
            }
        }

        if (firstElement) {
            div = firstElement;
        }

        Dom.addClass(div, className);
        Dom.addClass(div, templateName);

        _processTemplate(div, namingContext, templateName);

        return div;
    };
    return {
        loadStyleSheetFromPath: function(path) {
            if (less) {
                less.render("@import \"" + path + "\";", lessParserConfig).then(function(output) {
                    var node = widget.Util.insertGlobalStyleSheet(output.css, name);
                }).catch(function (e) {
                    console.error(e);
                });
            }
        },
        insertGlobalStyleSheet: function (css, templateName) {
            var head = document.head || document.getElementsByTagName("head")[0];
            var style = document.createElement("style");
            style.type = "text/css";
            style.setAttribute("widget", templateName);

            if (style.styleSheet) {
                style.styleSheet.cssText = "";
            }

            head.appendChild(style);
            style.appendChild(document.createTextNode(css));
            return style;
        },
        processLocalizationMacros: function (html) {
            if (!window.Messages) return html;
            return html.replace(/#\{([^\r\n\}]+)\}/g, function (all, one) {
                var s = Messages[one] || one;
                return Dom.htmlEncode(s);
            });
        },
        performAutoBinding: function (container, namingContext, ownerTemplateName, forced) {
            Dom.doOnChildRecursively(container, {
                eval: function(n) {
                    return ((n.getAttribute && n.getAttribute("ui-type")) || n.localName == "ui" || (n.namespaceURI == "http://evolus.vn/Namespaces/WebUI/1.0")) && (n.getAttribute("autobinding") != "false" || forced);
                }
            }, function(n) {
                if (!namingContext.__childWidgets) namingContext.__childWidgets = [];

                var clazz = n.getAttribute("type");
                if (!clazz) clazz = n.getAttribute("ui-type");
                if (!clazz) clazz = n.localName;
                if (!clazz) return;

                var f = window[clazz];
                if (!f) {
                    console.log("No implementation found for: " + clazz);
                    return;
                }
                var wg = new f(n);

                for (var i = 0; i < n.attributes.length; i ++) {
                    var name = n.attributes[i].name;
                    var value = n.attributes[i].value;

                    if (name == "anon-id") {
                        if (namingContext) {
                            namingContext[value] = wg;
                            Dom.addClass(wg.node(), "AnonId_" + value);
                            Dom.addClass(wg.node(), "AnonId_" + (ownerTemplateName ? (ownerTemplateName + "_") : "") + value);
                        }
                        wg._anonId = value;
                    } else if (name == "style") {
                        var currentStyle = wg.node().getAttribute("style");
                        if (currentStyle) {
                            currentStyle += value;
                        } else {
                            currentStyle = value;
                        }
                        wg.node().setAttribute("style", currentStyle);
                    } else if (name == "flex") {
                        wg.node().setAttribute("flex", value);
                    } else if (name == "class") {
                        Dom.addClass(wg.node(), value);
                    } else {
                        wg[name] = value;
                        if (name != "type") {
                            wg.node().setAttribute(name, value);
                        }
                    }
                }

                var parentNode = n.parentNode;
                parentNode.replaceChild(wg.node(), n);
                namingContext.__childWidgets.push(wg);

                if (wg.setContentFragment && n.childNodes) {
                    var f = wg.node().ownerDocument.createDocumentFragment();

                    while (n.firstChild) {
                        var child = n.firstChild;
                        n.removeChild(child);
                        f.appendChild(child);
                    }

                    widget.Util.performAutoBinding(f, namingContext);
                    wg.setContentFragment(f);
                }

                // if (parentNode.ownerDocument.body.contains(parentNode)) wg.signalOnAttached();
            });
        },
        buildDOMFromTemplate: function(template, namingContext) {
            template = widget.get(template);
            var dolly = template.cloneNode(true);

            widget.Util._processTemplate(dolly, namingContext);

            return dolly;
        },
        loadTemplate: function(path, callback) {
            if (!callback) return widget.Util.loadTemplateSync(path);

            if (typeof (TEMPLATE_CACHE[path]) != "undefined") {
                if (callback) {
                    callback(TEMPLATE_CACHE[path]);
                    return;
                } else {
                    return TEMPLATE_CACHE[path];
                }
            }

            var task = function(done) {
                var templateURL = widget.STATIC_BASE + path;

                var __process = function (html) {
                    done();
                    html = widget.Util.processLocalizationMacros(html);
                    TEMPLATE_CACHE[path] = html;
                    callback(html);
                }

                if (window.__TEMPLATE_BUNDLE && window.__TEMPLATE_BUNDLE[templateURL]) {
                    __process(window.__TEMPLATE_BUNDLE[templateURL]);
                } else {
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function() {
                        if (request.readyState == 4) {
                            __process(request.responseText);
                        }
                    };
                    request.open("GET", templateURL + "?t=" + widget.CACHE_RANDOM, true);
                    request.send(null);
                }
            };

            run(task);
        },
        loadTemplateSync: function(path) {
            if (typeof (TEMPLATE_CACHE[path]) != "undefined") {
                return TEMPLATE_CACHE[path];
            }

            var html = null;

            var templateURL = widget.STATIC_BASE + path;
            if (window.__TEMPLATE_BUNDLE) html = window.__TEMPLATE_BUNDLE[templateURL];

            if (!html) {
                var request = new XMLHttpRequest();
                request.open("GET", templateURL + "?t=" + widget.CACHE_RANDOM, false);
                request.send(null);
                html = request.responseText;
            }

            html = widget.Util.processLocalizationMacros(html);
            TEMPLATE_CACHE[path] = html;

            return html;
        },
        loadTemplateAsNode: function(path, callback, namingContext) {
            widget.Util.loadTemplate(path, function (html) {
                callback(_toTemplateNode(path, html, namingContext));
            });
        },
        loadTemplateAsNodeSync: function(path, namingContext) {
            var html = widget.Util.loadTemplateSync(path);
            return _toTemplateNode(path, html, namingContext);

        },
        registerGlobalListener: function(listener) {
            if (!widget.globalListeners) widget.globalListeners = [];
            widget.globalListeners.push(listener);
        },
        fireGlobalEvent: function() {
            if (!widget.globalListeners) return;
            var name = arguments[0];
            var args = [];
            for ( var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            for ( var i = 0; i < widget.globalListeners.length; i++) {
                var listener = widget.globalListeners[i];
                if (!listener[name]) continue;
                var f = listener[name];
                f.apply(listener, args);
            }
        },
        createOverlayCover: function (zIndex, opacity, color, onClose) {
            var cover = document.createElement("div");
            document.body.appendChild(cover);
            cover.style.position = "fixed";
            cover.style.top = "0px";
            cover.style.left = "0px";
            cover.style.bottom = "0px";
            cover.style.right = "0px";

            if (opacity) cover.style.opacity = "" + opacity;
            if (zIndex) cover.style.zIndex = "" + zIndex;
            if (color) cover.style.background = color;

            if (onClose) {
                Dom.registerEvent(cover, "click", function () {
                    cover.parentNode.removeChild(cover);
                    onClose();
                });
            }

            return cover;
        },
        createBlankCover: function (onClose) {
            return this.createOverlayCover(widget.Dialog.getTopZIndex(), 0, null, onClose);
        },
        createDarkCover: function (onClose) {
            return this.createOverlayCover(widget.Dialog.getTopZIndex(), 0.3, "#000", onClose);
        },
        popupStack: [],
        positionAsPopup: function (node, anchor, hAlign, vAlign, hPadding, vPadding) {
            if (!node.parentNode || node.parentNode != document.body) {
                if (node.parentNode) node.parentNode.removeChild(node);
                document.body.appendChild(node);

                node.style.visibility = "hidden";

                node.style.left = "0px";
                node.style.top = "0px";

                window.setTimeout(function () {
                    widget.Util.positionAsPopup(node, anchor, hAlign, vAlign, hPadding, vPadding);
                }, 10);

                return;
            }
            node.style.left = "0px";
            node.style.top = "0px";

            var display = node.style.display;

            node.style.display = "block";

            var w = node.offsetWidth;
            var h = node.offsetHeight;

            node.style.display = display;

            var rect = anchor.getBoundingClientRect();
            var aw = rect.width;
            var ah = rect.height;
            var ax = rect.left;
            var ay = rect.top;

            var p = hPadding || 0;

            var x = 0;
            if (hAlign == "left") x = ax - w - p;
            if (hAlign == "left-inside") x = ax + p;
            if (hAlign == "middle" || hAlign == "center") x = ax + aw / 2 - w / 2;
            if (hAlign == "right") x = ax + aw + p;
            if (hAlign == "right-inside") x = ax + aw - w - p;

            p = vPadding || p;

            var y = 0;
            if (vAlign == "top") y = ay - h - p;
            if (vAlign == "top-inside") y = ay + p;
            if (vAlign == "middle" || vAlign == "center") y = ay + ah / 2 - h / 2;
            if (vAlign == "bottom") y = ay + ah + p;
            if (vAlign == "bottom-inside") y = ay + ah - h - p;

            //invalidate into view
            var screenW = document.body.offsetWidth - 10;
            if (x + w > screenW) x = screenW - w;

            var screenH = document.body.offsetHeight - 10;
            if (y + h > screenH) y = ay - h - p;

            node.style.position = "absolute";
            node.style.left = x + "px";
            node.style.top = y + "px";
            node.style.zIndex = "9999";
            node.style.visibility = "visible";

            widget.Util.popupStack.push(node);
        },
        registerPopopCloseHandler: function () {
            document.body.addEventListener("mousedown", function (event) {
                if (widget.Util.popupStack.length == 0) return;
                var popup = widget.Util.popupStack[widget.Util.popupStack.length - 1];
                var node = Dom.findUpward(event.target, function (n) {
                    return n == popup;
                });
                if (node) return;
                popup.style.visibility = "hidden";
                widget.Util.popupStack.pop();
                event.preventDefault();
            }, false);
        },
        configureNumberInput: function (input, min, max) {
            input._min = min;
            input._max = max;
        },
        registerJustClickedHandler: function () {
            document.body.addEventListener("mousedown", function (event) {
                var start = event.target;
                while (start && start.nodeType != 1) start = start.parentNode;
                if (!start) return;
                var target = Dom.findUpward(start, function (node) {
                    var n = window.getComputedStyle(node).animationName;
                    return (n && n != "none") ? true : false;
                });
                if (!target) return;
                var animationName = window.getComputedStyle(target).animationName;
                var animationDuration = window.getComputedStyle(target).animationDuration;
                if (animationName) {
                    var attributeName = animationName + "-just-clicked";
                    if (target._lastJustClickedTimeout) window.clearTimeout(target._lastJustClickedTimeout);

                    var runnable = function () {
                        target.setAttribute(attributeName, "true");

                        var timeout = 0;
                        if (animationDuration && animationDuration.match(/([0-9\.]+)s/)) {
                            timeout = parseFloat(RegExp.$1) * 1000;
                        }
                        if (!timeout) timeout = 1000;

                        target._lastJustClickedTimeout = window.setTimeout(function () {
                            target.removeAttribute(attributeName);
                            target._lastJustClickedTimeout = null;
                        }, Math.round(timeout * 1.2));
                    };

                    if (target.hasAttribute(attributeName)) {
                        target.removeAttribute(attributeName);
                        window.setTimeout(runnable, 10);
                    } else {
                        runnable();
                    }
                }
            }, false);
        }
    };
}();

var busyIndicator = null;
function initBusyIndicator() {
    if (busyIndicator) return;
    busyIndicator = {};

    busyIndicator.overlay = document.createElement("div");
    document.body.appendChild(busyIndicator.overlay);
    Dom.addClass(busyIndicator.overlay, "Overlay");
    Dom.addClass(busyIndicator.overlay, "BusyOverlay");

    document.body.appendChild(busyIndicator.overlay);
    busyIndicator.overlay.style.display = "none";

    busyIndicator.messageContainer = document.createElement("div");
    document.body.appendChild(busyIndicator.messageContainer);
    busyIndicator.messageContainer.style.visibility = "hidden";

    Dom.addClass(busyIndicator.messageContainer, "BusyMessage");
    var spinner = document.createElement("i");
    busyIndicator.messageContainer.appendChild(spinner);
    Dom.addClass(spinner, "fa fa-spinner fa-spin");

    busyIndicator.message = document.createElement("span");
    Dom.addClass(busyIndicator.message, "Text");
    busyIndicator.messageContainer.appendChild(busyIndicator.message);
    Dom.setInnerText(busyIndicator.message, widget.LOADING);

    var w = Dom.getOffsetWidth(busyIndicator.messageContainer);
    busyIndicator.messageContainer.style.marginLeft = "-" + (w / 2) + "px";
}
var defaultIndicator = {
    count: 0,
    busy: function(message) {
        initBusyIndicator();

        Dom.setInnerText(busyIndicator.message, message || widget.LOADING);
        var w = Dom.getOffsetWidth(busyIndicator.messageContainer);
        busyIndicator.messageContainer.style.marginLeft = "-" + (w / 2) + "px";

        busyIndicator.messageContainer.style.visibility = "visible";
        busyIndicator.overlay.style.display = "block";
        this.count++;
    },
    done: function() {
        this.count--;
        if (this.count <= 0) {
            busyIndicator.messageContainer.style.visibility = "hidden";
            busyIndicator.overlay.style.display = "none";
        }
    }
}

function NodeBusyIndicator(node) {
    this.node = node;
}
NodeBusyIndicator.prototype.busy = function (m) {
    Dom.addClass(this.node, "Busy");
};
NodeBusyIndicator.prototype.done = function (m) {
    Dom.removeClass(this.node, "Busy");
};

function run(task, message, indicator) {
    var i = indicator || defaultIndicator;
    var m = message || null;

    i.busy(m);
    task(function() {
        i.done();
    });
}

function BaseWidget(definitionNode) {
    var node = this.buildDOMNode(definitionNode);

    Dom.addClass(node, "widget_" + this.constructor.name);
    this.__node = node;
    node.__widget = this;

    var thiz = this;
    node.addEventListener("DOMNodeInsertedIntoDocument", function () {
        if (thiz.onFirstInsertedIntoDocument && !thiz._signalInserted) {
            thiz.onFirstInsertedIntoDocument();
            thiz._signalInserted = true;
        }

        if (thiz.onInsertedIntoDocument) thiz.onInsertedIntoDocument();
    }, false);

    this.__delegate("addEventListener", "hasAttribute", "getAttribute", "setAttribute", "setAttributeNS", "removeAttribute", "removeAttributeNS", "dispatchEvent");
}
//@abstract BaseWidget.prototype.buildDOMNode = function () {};
BaseWidget.prototype.node = function () {
    return this.__node;
};
BaseWidget.prototype.__base = function () {
    return __base(this);
};
BaseWidget.prototype.e = function (member, target) {
    if (member instanceof Function) return member.apply(target || this);
    return member;
};
BaseWidget.signalOnAttachedRecursively = function (container) {
    if (container.__widget && container.__widget.onAttached) {
        container.__widget.onAttached();
    }
    for (var i = 0; i < container.childNodes.length; i++) {
        var child = container.childNodes[i];
        BaseWidget.signalOnAttachedRecursively(child);
    }
};
BaseWidget.signalOnDetachedRecursively = function (container) {
    if (container.__widget && container.__widget.onDetached) {
        container.__widget.onDetached();
    }
    for (var i = 0; i < container.childNodes.length; i++) {
        var child = container.childNodes[i];
        BaseWidget.signalOnDetachedRecursively(child);
    }
};


BaseWidget.RESPONSIVE_BREAKPOINTS = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};
BaseWidget.invalidateResponsiveBreakpointClasses = function (viewport) {
    var w = viewport.offsetWidth;
    for (var name in BaseWidget.RESPONSIVE_BREAKPOINTS) {
        console.log(w, name, w >= BaseWidget.RESPONSIVE_BREAKPOINTS[name]);
        Dom.toggleClass(viewport, name, w >= BaseWidget.RESPONSIVE_BREAKPOINTS[name]);
    }
};
BaseWidget.signalOnSizeChangedRecursively = function (container) {
    if (container.__widget && container.__widget.onSizeChanged) {
        container.__widget.onSizeChanged();
    }
    if (Dom.hasClass(container, "sys-viewport")) {
        BaseWidget.invalidateResponsiveBreakpointClasses(container);
    }
    for (var i = 0; i < container.childNodes.length; i++) {
        var child = container.childNodes[i];
        BaseWidget.signalOnSizeChangedRecursively(child);
    }
};
BaseWidget.prototype.bind = function (eventName, f, node) {
    var n = node || this.__node;
    var thiz = this;
    n.addEventListener(eventName, function (event) {
        f.apply(thiz, [event]);
    });
};

BaseWidget.prototype.onAttached = function () { };
Object.defineProperty(BaseWidget.prototype, "ownerDocument", {
    get: function () {
        return this.node().ownerDocument;
    }
});

BaseWidget.prototype.into = function (container) {
    container.appendChild(this.node());
    return this;
};
BaseWidget.prototype.__delegate = function () {
    for (var i = 0; i < arguments.length; i ++) {
        this.__delegateOne(arguments[i]);
    }
};
BaseWidget.prototype.__delegateOne = function (name) {
    var thiz = this;
    this[name] = function () {
        var f = thiz.__node[name];
        var args = [];
        for (var i = 0; i < arguments.length; i ++) {
            args.push(arguments[i]);
        }
        return f.apply(thiz.__node, args);
    };
};
BaseWidget.prototype.buildDOMNode = function () {
    var node = document.createElement("div");
    return node;
};

BaseWidget.registerDOMMutationHandler = function () {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "childList") {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    for (var i = 0; i < mutation.addedNodes.length; i ++) {
                        var container = mutation.addedNodes[i];
                        BaseWidget.signalOnAttachedRecursively(container);
                    }
                } else if (mutation.removedNodes && mutation.removedNodes.length > 0) {
                    for (var i = 0; i < mutation.removedNodes.length; i ++) {
                        var container = mutation.removedNodes[i];
                        BaseWidget.signalOnDetachedRecursively(container);
                    }
                }

            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
};

BaseWidget.closables = [];
BaseWidget.registerClosable = function (closable) {
    BaseWidget.tryRegisterCloseHandlers();

    BaseWidget.unregisterClosable(closable);
    BaseWidget.closables.push(closable);
};
BaseWidget.unregisterClosable = function (closable) {
    var index = BaseWidget.closables.indexOf(closable);
    if (index >= 0) BaseWidget.closables.splice(index, 1);
};
BaseWidget.handleClosableEscapeKey = function (event) {
    if (BaseWidget.closables.length == 0) return;
    var closable = BaseWidget.closables[BaseWidget.closables.length - 1];
    var shouldClose = closable.canCloseNow ? closable.canCloseNow() : true;
    if (typeof(shouldClose) == "undefined") shouldClose = true;

    if (shouldClose) {
        closable.close();
        BaseWidget.unregisterClosable(closable);
        event.preventDefault();
        Dom.cancelEvent(event);
    }
};
BaseWidget.handleGlobalMouseDown = function (event) {
    if (BaseWidget.closables.length == 0) return;
    var closable = BaseWidget.closables[BaseWidget.closables.length - 1];
    var container = closable.getClosableContainer ? closable.getClosableContainer() : closable;
    var found = Dom.findUpward(event.target, function (node) {
        return node == container;
    });
    if (found) return;

    var shouldClose = closable.shouldCloseOnBlur ? closable.shouldCloseOnBlur(event) : false;
    if (!shouldClose) return;

    closable.close("onBlur");
    BaseWidget.unregisterClosable(closable);
    event.preventDefault();
    Dom.cancelEvent(event);
};

BaseWidget.tryRegisterCloseHandlers = function () {
    if (BaseWidget.closeHandlersRegistered) return;

    window.addEventListener("keydown", function (event) {
        if (event.keyCode == DOM_VK_ESCAPE) {
            BaseWidget.__lastEscapeKeyDown = event.timeStamp;
        }
    }, false);
    window.addEventListener("keyup", function (event) {
        if (event.keyCode == DOM_VK_ESCAPE) {
            if (!BaseWidget.__lastEscapeKeyDown || (event.timeStamp - BaseWidget.__lastEscapeKeyDown > 1000)) return;
            BaseWidget.handleClosableEscapeKey(event);
        }
    }, false);


    document.body.addEventListener("mousedown", function (event) {
        BaseWidget.handleGlobalMouseDown(event);
    }, true);

    BaseWidget.closeHandlersRegistered = true;
};
BaseWidget.findUpward = function (node, type) {
    var n = Dom.findUpward(node, function (x) {
        return x.__widget && x.__widget instanceof type;
    });

    return n ? n.__widget : null;
}
BaseWidget.prototype.findUpward = function (type) {
    return BaseWidget.findUpward(this.node(), type);
};

function BaseTemplatedWidget() {
    BaseWidget.call(this);
}
__extend(BaseWidget, BaseTemplatedWidget);
BaseTemplatedWidget.getTemplatePrefix = function () {
    return __getFrameworkPrefix() + "widget/";
};
BaseTemplatedWidget.prototype.buildDOMNode = function () {
    var path = this.getTemplatePath();
    var node = widget.Util.loadTemplateAsNodeSync(path, this);
    return node;
};
BaseTemplatedWidget.prototype.getTemplatePrefix = function () {
    if (this.__pathPrefix) return this.__pathPrefix;
    return BaseTemplatedWidget.getTemplatePrefix();
};
BaseTemplatedWidget.prototype.getTemplatePath = function () {
    return this.getTemplatePrefix() + this.constructor.name + ".xhtml";
};

widget.busyIndicator = (function () {
    var busyCount = 0;
    var currentBusyOverlay = null;

    function showBusyIndicator() {
        currentBusyOverlay = document.createElement("div");
        document.body.appendChild(currentBusyOverlay);
        currentBusyOverlay.style.cssText = "position: absolute; z-index:1000; top: 0px; left: 0px; right: 0px; bottom: 0px; cursor: wait;";
    }
    function hideBusyIndicator() {
        if (currentBusyOverlay) {
            if (currentBusyOverlay.parentNode) currentBusyOverlay.parentNode.removeChild(currentBusyOverlay);
            currentBusyOverlay = null;
        }
    }
    function busy() {
        busyCount ++;
        if (busyCount == 1) showBusyIndicator();
    }
    function unbusy() {
        if (busyCount > 0) busyCount --;
        if (busyCount == 0) hideBusyIndicator();
    }

    return {
        busy: busy,
        unbusy: unbusy
    }
})();

window.__busyIndicator = widget.busyIndicator;
window.APP_THEME_PATH = __getFrameworkPrefix() + "style/theme-default.less";
window.addEventListener("load", function () {
    BaseWidget.registerDOMMutationHandler();
    window.globalViews = {};
    widget.Util.loadStyleSheetFromPath(APP_THEME_PATH, "theme-default");

    widget.Util.performAutoBinding(document.head, window.globalViews);
    widget.Util.performAutoBinding(document.body, window.globalViews);
    widget.Util.registerPopopCloseHandler();
    widget.Util.registerJustClickedHandler();

    window.addEventListener("optimizedResize", function() {
        BaseWidget.signalOnSizeChangedRecursively(document.body);
    });
}, false);
