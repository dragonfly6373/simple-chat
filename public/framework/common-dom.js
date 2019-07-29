/*
    Evolus Commons DOM
    Copyright (c) Evolus Solutions. All rights reserved.

    $Id: evolus.common-dom.js,v 1.4 2007/06/06 08:43:42 dgthanhan Exp $
*/
const DOM_VK_CANCEL = 3
const DOM_VK_HELP = 6
const DOM_VK_BACK_SPACE = 8
const DOM_VK_TAB = 9
const DOM_VK_CLEAR = 12
const DOM_VK_RETURN = 13
const DOM_VK_ENTER = 14
const DOM_VK_SHIFT = 16
const DOM_VK_CONTROL = 17
const DOM_VK_ALT = 18
const DOM_VK_PAUSE = 19
const DOM_VK_CAPS_LOCK = 20
const DOM_VK_ESCAPE = 27
const DOM_VK_SPACE = 32
const DOM_VK_PAGE_UP = 33
const DOM_VK_PAGE_DOWN = 34
const DOM_VK_END = 35
const DOM_VK_HOME = 36
const DOM_VK_LEFT = 37
const DOM_VK_UP = 38
const DOM_VK_RIGHT = 39
const DOM_VK_DOWN = 40
const DOM_VK_PRINTSCREEN = 44
const DOM_VK_INSERT = 45
const DOM_VK_DELETE = 46
const DOM_VK_0 = 48
const DOM_VK_1 = 49
const DOM_VK_2 = 50
const DOM_VK_3 = 51
const DOM_VK_4 = 52
const DOM_VK_5 = 53
const DOM_VK_6 = 54
const DOM_VK_7 = 55
const DOM_VK_8 = 56
const DOM_VK_9 = 57
const DOM_VK_SEMICOLON = 59
const DOM_VK_EQUALS = 61
const DOM_VK_A = 65
const DOM_VK_B = 66
const DOM_VK_C = 67
const DOM_VK_D = 68
const DOM_VK_E = 69
const DOM_VK_F = 70
const DOM_VK_G = 71
const DOM_VK_H = 72
const DOM_VK_I = 73
const DOM_VK_J = 74
const DOM_VK_K = 75
const DOM_VK_L = 76
const DOM_VK_M = 77
const DOM_VK_N = 78
const DOM_VK_O = 79
const DOM_VK_P = 80
const DOM_VK_Q = 81
const DOM_VK_R = 82
const DOM_VK_S = 83
const DOM_VK_T = 84
const DOM_VK_U = 85
const DOM_VK_V = 86
const DOM_VK_W = 87
const DOM_VK_X = 88
const DOM_VK_Y = 89
const DOM_VK_Z = 90
const DOM_VK_CONTEXT_MENU = 93
const DOM_VK_NUMPAD0 = 96
const DOM_VK_NUMPAD1 = 97
const DOM_VK_NUMPAD2 = 98
const DOM_VK_NUMPAD3 = 99
const DOM_VK_NUMPAD4 = 100
const DOM_VK_NUMPAD5 = 101
const DOM_VK_NUMPAD6 = 102
const DOM_VK_NUMPAD7 = 103
const DOM_VK_NUMPAD8 = 104
const DOM_VK_NUMPAD9 = 105
const DOM_VK_MULTIPLY = 106
const DOM_VK_ADD = 107
const DOM_VK_SEPARATOR = 108
const DOM_VK_SUBTRACT = 109
const DOM_VK_DECIMAL = 110
const DOM_VK_DIVIDE = 111
const DOM_VK_F1 = 112
const DOM_VK_F2 = 113
const DOM_VK_F3 = 114
const DOM_VK_F4 = 115
const DOM_VK_F5 = 116
const DOM_VK_F6 = 117
const DOM_VK_F7 = 118
const DOM_VK_F8 = 119
const DOM_VK_F9 = 120
const DOM_VK_F10 = 121
const DOM_VK_F11 = 122
const DOM_VK_F12 = 123
const DOM_VK_F13 = 124
const DOM_VK_F14 = 125
const DOM_VK_F15 = 126
const DOM_VK_F16 = 127
const DOM_VK_F17 = 128
const DOM_VK_F18 = 129
const DOM_VK_F19 = 130
const DOM_VK_F20 = 131
const DOM_VK_F21 = 132
const DOM_VK_F22 = 133
const DOM_VK_F23 = 134
const DOM_VK_F24 = 135
const DOM_VK_NUM_LOCK = 144
const DOM_VK_SCROLL_LOCK = 145
const DOM_VK_COMMA = 188
const DOM_VK_PERIOD = 190
const DOM_VK_SLASH = 191
const DOM_VK_BACK_QUOTE = 192
const DOM_VK_OPEN_BRACKET = 219
const DOM_VK_BACK_SLASH = 220
const DOM_VK_CLOSE_BRACKET = 221
const DOM_VK_QUOTE = 222
const DOM_VK_META = 224

if (window.EVOLUS_COMMON_DOM) {
    window.EVOLUS_COMMON_DOM.count ++;
    alert("Reference Error:\n" +
            "Duplicated references of Evolus Common Dom found. Ref. count = " + (window.EVOLUS_COMMON_DOM.count));
} else {
    window.EVOLUS_COMMON_DOM = new Object();
    window.EVOLUS_COMMON_DOM.count = 1;
}

if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };


(function(d,g){d[g]||(d[g]=function(g){return this.querySelectorAll("."+g)},Element.prototype[g]=d[g])})(document,"getElementsByClassName");


var Namespaces = { };

Namespaces["p"] = "http://www.evolus.vn/Namespace/Pencil";
Namespaces["svg"] = "http://www.w3.org/2000/svg";
Namespaces["xlink"] = "http://www.w3.org/1999/xlink";
Namespaces["xul"] = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
Namespaces["html"] = "http://www.w3.org/1999/xhtml";
Namespaces["xbl"] = "http://www.mozilla.org/xbl";

Namespaces["inkscape"] = "http://www.inkscape.org/namespaces/inkscape";
Namespaces["dc"] = "http://purl.org/dc/elements/1.1/";
Namespaces["cc"] = "http://creativecommons.org/ns#";
Namespaces["rdf"] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
Namespaces["sodipodi"] = "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd";

var PencilNamespaces = Namespaces;


Namespaces.resolve = function (prefix) {
    var uri = Namespaces[prefix];
    if (uri) return uri;

    return null;
};

function Dom() {
}


Dom.workOn = function (xpath, node, worker) {
    var nodes = Dom.getList(xpath, node);

    for (var i = 0; i < nodes.length; i ++) {
        worker(nodes[i]);
    }
    return nodes.length;
};
Dom.getText = function (node) {
    return node.textContent;
};

Dom.getSingle = function (xpath, node) {
    if (document.all) {
        node.ownerDocument.setProperty("SelectionLanguage", "XPath");
        return node.selectSingleNode(xpath);
    }
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var xpathResult = doc.evaluate(xpath, node, Namespaces.resolve, XPathResult.ANY_TYPE, null);
    return xpathResult.iterateNext();
};
Dom.getSingleValue = function (xpath, node) {
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var xpathResult = doc.evaluate(xpath, node, Namespaces.resolve, XPathResult.ANY_TYPE, null);
    var node = xpathResult.iterateNext();

    return node ? node.nodeValue : null;
};
Dom.getList = function (xpath, node) {
    //alert(node.selectNodes);
    if (document.all) {
        node.ownerDocument.setProperty("SelectionLanguage", "XPath");
        return node.selectNodes(xpath);
    }

    var doc = node.ownerDocument ? node.ownerDocument : node;
    var xpathResult = doc.evaluate(xpath, node, Namespaces.resolve, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var nodes = [];
    var next = xpathResult.iterateNext();
    while (next) {
        nodes.push(next);
        next = xpathResult.iterateNext();
    }

    return nodes;
}
Dom.setEnabled = function (enabled) {
    for (var i = 1; i < arguments.length; i ++) {
        var node = arguments[i];
        if (!node) continue;
        node.disabled = !enabled;
        if (enabled) {
            if (node.removeAttribute) {
                node.removeAttribute("disabled");
            }
        } else {
            if (node.setAttribute) {
                node.setAttribute("disabled", "true");
            }
        }
    }
};
Dom.getChildValue = function (xpath, node) {
    try {
        return Dom.getSingle(xpath, node).nodeValue;
    } catch (e) {
        return null;
    }
};
Dom.isElementExistedInDocument = function(element) {
    while (element) {
        if (element == document) {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}

Dom.registerEvent = function (target, event, handler, capture) {
    if (!target) {
        //console.log("Can not register event to NULL target", event, handler);
        return;
    }
    if (event == "wheel") {
        window.addWheelListener(target, handler, capture);
        return;
    }

    var useCapture = false;
    if (capture) {
        useCapture = true;
    }
    if (target.addEventListener) {
        target.addEventListener(event, handler, useCapture);
    } else if (target.attachEvent) {
        target.attachEvent("on" + event, handler);
    }
};

Dom.unregisterEvent = function (target, event, handler, capture) {
    var useCapture = false;
    if (capture) {
        useCapture = true;
    }
    if (target.removeEventListener) {
        target.removeEventListener(event, handler, useCapture);
    } else if (target.dettachEvent) {
        target.dettachEvent("on" + event, handler);
    }
};
Dom.empty = function (node) {
    if (!node) return;
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};

Dom.parser = new DOMParser();
Dom.serializer = new XMLSerializer();
Dom.parseToNode = function (xml, dom) {
    var doc = Dom.parser.parseFromString(xml, "text/xml");
    if (!doc || !doc.documentElement
            || doc.documentElement.namespaceURI == "http://www.mozilla.org/newlayout/xml/parsererror.xml") {
        return null;
    }
    var node = doc.documentElement;
    if (dom) return dom.importNode(node, true);

    return node;
}
Dom.parseDocument = function (xml) {
    var dom = Dom.parser.parseFromString(xml, "text/xml");
    return dom;
};

Dom.disableEvent = function (node, event) {
    Dom.registerEvent(node, event, function(ev) {Dom.cancelEvent(ev);}, true );
};

Dom.getEvent = function (e) {
    return window.event ? window.event : e;
};

Dom.getTarget = function (e) {
    if (!e) return {};
    if (e.target) return e.target;
    var event = Dom.getEvent(e);
    return event.srcElement ? event.srcElement : event.originalTarget;
};

Dom.getWheelDelta = function (e) {
    var event = Dom.getEvent(e);
    var delta = 0;
    if (event.wheelDelta) { /* IE/Opera. */
            delta = event.wheelDelta/120;
            /** In Opera 9, delta differs in sign as compared to IE.
                */
    } else if (event.detail) { /** Mozilla case. */
            /** In Mozilla, sign of delta is different than in IE.
                * Also, delta is multiple of 3.
                */
            delta = -event.detail/3;
    }

    return delta;
};

Dom.emitEvent = function (name, sourceElement, options) {
    var evt = null;
    if (document.createEvent) {
        evt = document.createEvent("HTMLEvents");
        if (evt.initEvent) {
            evt.initEvent(name, true, false);
        }
    } else if (document.createEventObject) {
        evt = document.createEventObject();
        evt.eventType = name;
    }
    if (!evt) {
       //console.log("Can not find method create event to emit event" , name);
       return;
    }
    evt.eventName = name;

    for (n in options) evt[n] = options[n];

    //console.log("emit event on " , sourceElement.tagName, name);
    if (sourceElement.dispatchEvent) {
        sourceElement.dispatchEvent(evt);
    } else if (sourceElement.fireEvent) {
        sourceElement.fireEvent('on'+ evt.eventType, evt);
    } else if (sourceElement[name]) {
        sourceElement[name]();
    } else if (sourceElement['on'+name]) {
        sourceElement['on'+name]();
    }

};

Dom.getEventOffset = function (e, to) {
    var x = 0;
    var y = 0;

    if (to) {
        x = Dom.getOffsetLeft(to);
        y = Dom.getOffsetTop(to);
    }

    var event = Dom.getEvent(e);
    if (typeof(event.pageX) != "undefined" || typeof(event.pageY) != "undefined") {
        return {
            x: event.pageX - x,
            y: event.pageY - y
        }
    } else {
        return {
            x: event.clientX + Dom.getScrollLeft() - x,
            y: event.clientY + Dom.getScrollTop() - y
        }
    }
};

Dom.getTouchOffset = function (t, to) {
    var x = 0;
    var y = 0;

    if (to) {
        x = Dom.getOffsetLeft(to);
        y = Dom.getOffsetTop(to);
}

    return {
        x: t.pageX - x,
        y: t.pageY - y
    }
};

Dom.getEventScreenX = function (event) {
    if (event.touches && event.touches.length == 1) {
        return event.touches[0].screenX;
    } else {
        return event.screenX;
    }
};
Dom.getEventScreenY = function (event) {
    if (event.touches && event.touches.length == 1) {
        return event.touches[0].screenY;
    } else {
        return event.screenY;
    }
};
Dom.isMultiTouchEvent = function (event) {
    return event.touches && event.touches.length > 1;
};

Dom.cancelEvent = function (e) {
    var event = Dom.getEvent(e);
    if (event.preventDefault) event.preventDefault();
    else event.returnValue = false;
};
Dom.cancelEventBubbling = function (e) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

Dom.addClass = function (node, className) {
    if (!node) return;
    if ((" " + node.className + " ").indexOf(" " + className + " ") >= 0) return;
    node.className += " " + className;
};
Dom.removeClass = function (node, className) {
    if (!node) return;
    if (node.className == className) {
        node.className = "";
        return;
    }
    var re = new RegExp("(^" + className + " )|( " + className + " )|( " + className + "$)", "g");
    var reBlank = /(^[ ]+)|([ ]+$)/g;
    node.className = node.className ? node.className.replace(re, " ").replace(reBlank, "") : "";
};
Dom.toggleClass = function (node, className, add) {
    if (typeof(add) == "undefined") add = !Dom.hasClass(node, className);

    if (add) {
        Dom.addClass(node, className);
    } else {
        Dom.removeClass(node, className);
    }
}


Dom.getOffsetLeft = function (control) {
    var offset = control.offsetLeft;
    var parent = control.offsetParent;
    if (parent) if (parent != control) return offset + Dom.getOffsetLeft(parent);
    return offset;
};

Dom.getOffsetTop = function (control) {
    var offset = control.offsetTop;
    var parent = control.offsetParent;
    if (parent) if (parent != control) {
        var d = parent.scrollTop || 0;
        return offset + Dom.getOffsetTop(parent) - d;
    }
    return offset;
};

Dom.getOffsetHeight = function (control) {
    return control ? control.offsetHeight : 0;
};

Dom.getOffsetWidth = function (control) {
    return control ? control.offsetWidth : 0;
};

Dom.getWindowHeight = function () {
  if ( typeof( window.innerWidth ) == 'number' ) {
    return window.innerHeight;
  } else if ( document.documentElement &&
      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientHeight;
  } else if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    return document.body.clientHeight;
  }
  return 0;
};

Dom.getWindowWidth = function () {
  if ( typeof( window.innerWidth ) == 'number' ) {
    return window.innerWidth;
  } else if ( document.documentElement &&
      ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    return document.documentElement.clientWidth;
  } else if ( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    return document.body.clientWidth;
  }
  return 0;
};

Dom.getScrollTop = function () {
  if ( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    return window.pageYOffset;
  } else if ( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    return  document.body.scrollTop;
  } else if ( document.documentElement &&
      ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    return  document.documentElement.scrollTop;
  }
  return 0;
};

Dom.getScrollLeft = function () {
  if ( typeof( window.pageXOffset ) == 'number' ) {
    //Netscape compliant
    return window.pageXOffset;
  } else if ( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    return  document.body.scrollLeft;
  } else if ( document.documentElement &&
      ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    return  document.documentElement.scrollLeft;
  }
  return 0;
};
Dom.reformHTML = function (node) {
};
Dom.appendAfter = function (fragment, node) {
    if (!node.parentNode) {
        return;
    }
    if (node.nextSibling) {
        node.parentNode.insertBefore(fragment, node.nextSibling);
    } else {
        node.parentNode.appendChild(fragment);
    }
    //Dom.reformHTML(node.parentNode);
};
Dom.insertBefore = function (fragment, node) {
    if (!node.parentNode) {
        return;
    }
    node.parentNode.insertBefore(fragment, node);
    Dom.reformHTML(node.parentNode);
};
Dom.appendParent = function (fragment, node) {
    if (!node.parentNode) {
        return;
    }
    node.parentNode.appendChild(fragment);
    Dom.reformHTML(node.parentNode);
};
Dom.prependParent = function (fragment, node) {
    if (!node.parentNode) {
        return;
    }
    if (node.parentNode.childNodes.length > 0) {
        node.parentNode.insertBefore(fragment, node.parentNode.childNodes[0]);
    } else {
        node.parentNode.appendChild(fragment);
    }
    Dom.reformHTML(node.parentNode);
};
Dom.append = function (fragment, node) {
    node.appendChild(fragment);
    Dom.reformHTML(node);
};
Dom.prepend = function (fragment, node) {
    if (node.childNodes.length > 0) {
        node.insertBefore(fragment, node.childNodes[0]);
    } else node.appendChild(fragment);
    Dom.reformHTML(node);
};
Dom.replace = function (fragment, node) {
    if (!node.parentNode) {
        return;
    }
    node.parentNode.replaceChild(fragment, node);
    Dom.reformHTML(node.parentNode);
};
Dom.getAttributeAsInt = function (node, attrName, defaultValue) {
    if (!node || !node.hasAttribute || !node.hasAttribute(attrName)) return defaultValue;
    return parseInt(node.getAttribute(attrName), 10);
}
Dom.getAttributeAsFloat = function (node, attrName, defaultValue) {
    if (!node || !node.hasAttribute || !node.hasAttribute(attrName)) return defaultValue;
    return parseFloat(node.getAttribute(attrName));
}
Dom.getAttributeAsBoolean = function (node, attrName, defaultValue) {
    if (!node || !node.hasAttribute || !node.hasAttribute(attrName)) return defaultValue;
    return "true" == node.getAttribute(attrName);
}
Dom.getAttributeAsString = function (node, attrName, defaultValue) {
    if (!node || !node.hasAttribute || !node.hasAttribute(attrName)) return defaultValue;
    return node.getAttribute(attrName) || defaultValue;
}
Dom.xmlToFragment = function (xml) {
    var doc = null;
    var wrappedXml = "<root>" + xml + "</root>";
    if (document.implementation.createDocument) {
        var parser = new DOMParser();
        doc = parser.parseFromString(wrappedXml, "text/xml");
    } else {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.loadXML(wrappedXml);
    }
    var fragment = doc.createDocumentFragment();
    var root = doc.documentElement;
    for(var i = 0; i < root.childNodes.length; i++) {
        fragment.appendChild(root.childNodes[i].cloneNode(true));
    }
    return fragment;

};
Dom.importNode = function (doc, node, importChildren) {
    if (doc.importNode) return doc.importNode(node, importChildren);
    var i = 0;
    switch (node.nodeType) {
        case 11: // DOCUMENT FRAGMENT
            var newNode = doc.createDocumentFragment();
            if (importChildren) {
                for(i = 0; i < node.childNodes.length; i++) {
                    var clonedChild = Dom.importNode(doc, node.childNodes[i], true);
                    if (clonedChild) newNode.appendChild(clonedChild);
                }
            }
            return newNode;
        case 1: // ELEMENT
            var newNode = doc.createElement(node.nodeName);
            for(i = 0; i < node.attributes.length; i++){
                newNode.setAttribute(node.attributes[i].name, node.attributes[i].value);
            }
            if (importChildren) {
                for(i = 0; i < node.childNodes.length; i++) {
                    var clonedChild = Dom.importNode(doc, node.childNodes[i], true);
                    if (clonedChild) newNode.appendChild(clonedChild);
                }
            }
            return newNode;
        case 3: // TEXT
            return doc.createTextNode(node.nodeValue);
    }
    return null;
};
Dom.get = function (id, doc) {
    var targetDocument = doc ? doc : document;
    return targetDocument.getElementById(id);
};
Dom.getTags = function (tag, doc) {
    var targetDocument = doc ? doc : document;
    return targetDocument.getElementsByTagName(tag);
};
Dom.getTag = function (tag, doc) {
    var targetDocument = doc ? doc : document;
    return targetDocument.getElementsByTagName(tag)[0];
};
Dom.isChildOf = function (parent, child) {
    if (!parent || !child) {
        return false;
    }
    if (parent == child) {
        return true;
    }
    return Dom.isChildOf(parent, child.parentNode);
};
Dom.findUpwardWithEval = function (node, evaluator, limit) {
    if (node == null || (limit && limit(node))) {
        return null;
    }
    if (evaluator.eval(node)) {
        return node;
    }
    return Dom.findUpward(node.parentNode, evaluator);
};
Dom.findUpward = function (node, evaluator) {
    try {
        if (node == null) {
            return null;
        }
        if (evaluator.eval) {
            return Dom.findUpwardWithEval(node, evaluator);
        }
        if (evaluator(node)) {
            return node;
        }
        return Dom.findUpward(node.parentNode, evaluator);
    } catch (e) { return null; }
};
Dom.findUpwardForData = function (node, dataName) {
    var n = Dom.findUpwardForNodeWithData(node, dataName);
    if (!n) return undefined;
    return n[dataName];
};
Dom.findUpwardForNodeWithData = function (node, dataName) {
    var n = Dom.findUpward(node, function (x) {
        return typeof(x[dataName]) != "undefined";
    });

    return n;
};
Dom.doUpward = function (node, evaluator, worker) {
    if (node == null) {
        return;
    }
    var ok = evaluator.eval ? evaluator.eval(node) : evaluator(node);
    if (ok) {
        if (worker.work) {
            worker.work(node);
        } else {
            worker(node);
        }
    }
    return Dom.doUpward(node.parentNode, evaluator, worker);
};
Dom.findChild = function (node, evaluator, recursive) {
    if (!node || !node.childNodes) return null;

    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (evaluator.eval(child)) return child;
        else if (recursive) {
            var result = Dom.findChild(child, evaluator, recursive);
            if (result) return result;
        }
    }

    return null;
};
Dom.doOnChild = function (node, evaluator, worker) {
    if (!node || !node.childNodes) return null;

    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (evaluator.eval(child)) worker(child);
    }

};
Dom.doOnSelector = function (node, selector, visitor) {
    Array.prototype.forEach.call(node.querySelectorAll(selector), visitor);
};
Dom.doOnAllChildren = function (node, worker) {
    Dom.doOnChild(node, DomAcceptAllEvaluator, worker);
};
Dom.doOnChildRecursively = function (node, evaluator, worker) {
    if (!node || !node.childNodes) return null;

    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        var ok = evaluator.eval ? evaluator.eval(child) : evaluator(child);
        if (ok) worker(child);
        Dom.doOnChildRecursively(child, evaluator, worker);
    }

};
Dom.findChildTag = function (node, tag) {
    return Dom.findChild(node, new DomTagNameEvaluator(tag));
};

Dom.findChildWithClass = function (node, className) {
    return Dom.findChild(node, {eval: function (node) {
        return (" " + node.className + " ").indexOf(" " + className + " ") >= 0;
    }});
};

Dom.findChildren = function (parentNode, evaluator, recursive) {
    var results = [];
    var children = parentNode.childNodes;
    for (var i = 0; i < children.length; i++ ) {
        var child = children[i];
        if (evaluator.eval(child)) {
            results.push(child);
        } else if (recursive) {
            if (child.childNodes.length > 0) results = results.concat(Dom.findChildren(child, evaluator, recursive));
        }
    }
    return results;
};

Dom.findChildrenWithClass = function (parentNode, className, recursive) {
    return Dom.findChildren(parentNode, {eval: function (node) {
            return Dom.hasClass(node, className);
        }
    }, recursive);
};

Dom.findChildrenByTagName = function (parentNode, tagName, recursive) {
    return Dom.findChildren(parentNode, {
        tagName: tagName.toUpperCase(),
        eval: function (node) {
            return node.tagName && node.tagName.toUpperCase && (node.tagName.toUpperCase() == this.tagName);
        }
    }, recursive);
};

Dom.findDescendantWithClass = function (node, className) {
    if (!node || !node.childNodes) return null;

    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if ((" " + child.className + " ").indexOf(" " + className + " ") >= 0) return child;
        var descendant = Dom.findDescendantWithClass(child, className);
        if (descendant) return descendant;
    }

    return null;
};
function DomTagNameEvaluator(tagName) {
    this.tagName = tagName.toUpperCase();
}
DomTagNameEvaluator.prototype.eval = function (node) {
    return node && node.tagName && node.tagName.toUpperCase && (node.tagName.toUpperCase() == this.tagName);
};
Dom.findParentWithClass = function (node, className) {
    return Dom.findUpward(node, {
        className: className,
        eval: function (node) {
            return (" " + node.className + " ").indexOf(" " + this.className + " ") >= 0;
        }
    });
};
Dom.findParentByTagName = function (node, tagName) {
    return Dom.findUpward(node, {
        tagName: tagName.toUpperCase(),
        eval: function (node) {
            return node.tagName && node.tagName.toUpperCase && (node.tagName.toUpperCase() == this.tagName);
        }
    });
}
Dom.findParentWithProperty = function (node, property) {
    if (node == null) {
        return null;
    }
    if (typeof(node[property]) != "undefined") {
        return node;
    }
    return Dom.findParentWithProperty(node.parentNode, property);
};
Dom.findParentWithAttribute = function (node, attName, attValue) {
    if (node == null) {
        return null;
    }
    //alert(node);
    if (node.getAttribute) {
        var value = node.getAttribute(attName);
        if (value) {
            if (!attValue) return node;
            if (attValue == value) return node;
        }
    }
    return Dom.findParentWithAttribute(node.parentNode, attName, attValue);
};
Dom.findNonEditableParent = function (node) {
    if (node == null) {
        return null;
    }
    return Dom.findNonEditableParent(node.parentNode);
};
Dom.isTag = function (node, tagName) {
    return (node.tagName && node.tagName.toUpperCase && node.tagName.toUpperCase() == tagName.toUpperCase());
};
Dom.hasClass = function (node, className) {
    return (" " + node.className + " ").indexOf(className) >= 0;
};
Dom.findFirstChild = function(node, tagName) {
    for (var i = 0; i < node.childNodes.length; i ++) {
        var child = node.childNodes[i];
        if (Dom.isTag(child, tagName)) {
            return child;
        }
    }
    return null;
}
Dom.findFirstChildWithClass = function(node, className) {
    for (var i = 0; i < node.childNodes.length; i ++) {
        var child = node.childNodes[i];
        if ((" " + child.className + " ").indexOf(" " + className + " ") >= 0) {
            return child;
        }
    }
    return null;
};
Dom.findLastChild = function(node, tagName) {
    for (var i = node.childNodes.length - 1; i >= 0; i --) {
        var child = node.childNodes[i];
        if (Dom.isTag(child, tagName)) {
            return child;
        }
    }
    return null;
}
Dom.findLastChildWithClass = function(node, className) {
    for (var i = node.childNodes.length - 1; i >= 0; i --) {
        var child = node.childNodes[i];
        if ((" " + child.className + " ").indexOf(" " + className + " ") >= 0) {
            return child;
        }
    }
    return null;
}
Dom.getDocumentBody = function () {
    return document.getElementsByTagName("body")[0];
};
Dom.attrEncode = function (s, preserveCR) {
    preserveCR = preserveCR ? '&#13;' : '\n';
    return ('' + s) /* Forces the conversion to string. */
        .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
        .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        /*
        You may add other replacements here for HTML only
        (but it's not necessary).
        Or for XML, only if the named entities are defined in its DTD.
        */
        .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
        .replace(/[\r\n]/g, preserveCR);
        ;
};
Dom.htmlEncode = function (s) {
    if (!Dom.htmlEncodePlaceHolder) {
        Dom.htmlEncodePlaceHolder = document.createElement("div");
    }
    Dom.htmlEncodePlaceHolder.innerHTML = "";
    Dom.htmlEncodePlaceHolder.appendChild(document.createTextNode(s));
    return Dom.htmlEncodePlaceHolder.innerHTML.replace(/[\n]/g, "<br/>");
};
Dom.htmlStrip = function (s) {
    if (!Dom.htmlEncodePlaceHolder) {
        Dom.htmlEncodePlaceHolder = document.createElement("div");
    }
    Dom.htmlEncodePlaceHolder.innerHTML = s;
    var t = Dom.getInnerText(Dom.htmlEncodePlaceHolder);
    Dom.htmlEncodePlaceHolder.innerHTML = "";
    return t;
};
Dom.setInnerText = function (node, text) {
    node.innerHTML = "";
    node.appendChild(node.ownerDocument.createTextNode(text));
};
Dom.getInnerText = function (node) {
    if (document.all) return node.innerText;
    if (node.textContent) return node.textContent;
    if (node.firstChild && node.firstChild.value) return node.firstChild.value;

    return "";
};

Dom.getIndexInParent = function (node, restrictedClass) {
    var parentNode = node.parentNode;
    var index = 0;
    for (var i = 0; i < parentNode.childNodes.length; i++) {
        var currentNode = parentNode.childNodes[i];
        if (restrictedClass && !Dom.hasClass(currentNode, restrictedClass)) continue;
        if (currentNode === node) return index;
        index ++;
    }
    return -1;
}

Dom.getChildByIndex = function (parentNode, index, restrictedClass) {
    if (index >= parentNode.childNodes.length) return null;
    if (!restrictedClass) return parentNode.childNodes[index];
    for (var i = 0, j = 0; i < parentNode.childNodes.length; i++) {
        var node = parentNode.childNodes[i];
        if (Dom.hasClass(node, restrictedClass)) {
            if (j == index) return node;
            j++;
        }
    }
    return null;
}

Dom.installBehavior = function(target, eventName, checker, handler) {
    Dom.registerEvent(target, eventName, function(e) {
                            if (checker.check(e)) {
                                handler.positive();
                            } else {
                                handler.nagative();
                            }
                        });
    Dom.registerEvent(window, "load", function(e) {
                            if (checker.check(null, target)) {
                                handler.positive();
                            } else {
                                handler.nagative();
                            }
                        });
};

Dom.newDOMElement = function (spec, doc, holder) {
    var ownerDocument = doc ? doc : document;
    var e = spec._uri ? ownerDocument.createElementNS(spec._uri, spec._name) : ownerDocument.createElement(spec._name);

    for (name in spec) {
        if (name.match(/^_/)) continue;

        if (name.match(/^([^:]+):(.*)$/)) {
            var prefix = RegExp.$1;
            var localName = RegExp.$2;
            var uri = Namespaces[prefix];
            e.setAttributeNS(uri, name, spec[name]);
        } else {
            e.setAttribute(name, spec[name]);
            if (name == "class") {
                Dom.addClass(e, spec[name]);
            }
        }
    }

    if (spec._style) {
        e.style.cssText = spec._style;
    }
    if (spec._text) {
        e.appendChild(e.ownerDocument.createTextNode(spec._text));
    }
    if (spec._cdata) {
        e.appendChild(e.ownerDocument.createCDATASection(spec._cdata));
    }
    if (spec._html) {
        e.innerHTML = spec._html;
    }
    if (spec._children && spec._children.length > 0) {
        e.appendChild(Dom.newDOMFragment(spec._children, e.ownerDocument, holder || null));
    }

    if (holder && spec._id) {
        holder[spec._id] = e;
    }

    return e;
};
Dom.newDOMFragment = function (specs, doc, holder) {
    var ownerDocument = doc ? doc : document;
    var f = ownerDocument.createDocumentFragment();

    for (var i in specs) {
        f.appendChild(Dom.newDOMElement(specs[i], ownerDocument, holder || null));
    }
    return f;
};

function DomSelectedChecker(targetElement) {
    this.targetElement = targetElement;
}
DomSelectedChecker.prototype.check = function (event, t) {
    var target = this.targetElement ? this.targetElement : (t ? t : Dom.getTarget(event));
    return target.checked || target.selected;
};
Dom.SELECTED_CHECKER = new DomSelectedChecker();


var DomAcceptAllEvaluator = {
    eval: function (target) { return true; }
};
function DomValueIsChecker(value) {
    this.value = value;
}
DomValueIsChecker.prototype.check = function (event, t) {
    var target = t ? t : Dom.getTarget(event);

    if (target.value && target.value == this.value) {
        return true;
    }

    if (target.selectedIndex && target.options && target.options[target.selectedIndex]) {
        if (target.options[target.selectedIndex].value == this.value) {
            return true;
        }
    }

    return false;
};

function DomValueInChecker(values) {
    this.values = values;
}
DomValueInChecker.prototype.check = function (event, t) {
    var target = t ? t : Dom.getTarget(event);

    var value = null;
    if (target.value) {
        value = target.value;
    }

    if (target.selectedIndex && target.options && target.options[target.selectedIndex]) {
        value = target.options[target.selectedIndex].value;
    }

    if (value && this.values.indexOf("|" + value + "|") >= 0) {
        return true;
    }
    return false;
};

function DomEnableToggleHandler(control) {
    this.control = control;
}
DomEnableToggleHandler.prototype.positive = function() {
    var firstControl = Dom.disableControls(this.control, false);
    if (firstControl && firstControl.focus) {
        firstControl.focus();
        firstControl.select();
    }
};
DomEnableToggleHandler.prototype.nagative = function() {
    Dom.disableControls(this.control, true);
};
Dom.disableControls = function (element, disabled) {
    var nodeName = element.nodeName.toUpperCase();
    if (nodeName == "INPUT" || nodeName == "TEXTAREA" || nodeName == "SELECT") {
        element.disabled = disabled;

        return element;
    } else if (element.childNodes) {
        var firstControl = null;
        for (var i = 0; i < element.childNodes.length; i ++) {
            var control = Dom.disableControls(element.childNodes[i], disabled);
            if (!firstControl) firstControl = control;
        }
        return firstControl;
    }
};
Dom.calculateSystemScrollbarSize = function () {
    if (Dom.calculatedSystemScrollbarSize) {
        return Dom.calculatedSystemScrollbarSize;
    }

    var wrapper = document.createElement("div");
    wrapper.style.overflow = "scroll";
    wrapper.style.visibility = "hidden";
    wrapper.style.position = "absolute";

    var inner = document.createElement("div");
    inner.style.width = "10px";
    inner.style.height = "10px";
    wrapper.appendChild(inner);

    document.body.appendChild(wrapper);

    Dom.calculatedSystemScrollbarSize = {
        w: Dom.getOffsetWidth(wrapper) - Dom.getOffsetWidth(inner),
        h: Dom.getOffsetHeight(wrapper) - Dom.getOffsetHeight(inner)
    };

    document.body.removeChild(wrapper);

    return Dom.calculatedSystemScrollbarSize;
};

Dom.getBoundingClientRect = function (target) {
    var box = target.getBoundingClientRect();
    var newBox = {top: box.top, bottom: box.bottom, left: box.left, right: box.right};
    newBox.width = box.right - box.left;
    newBox.height = box.bottom - box.top;
    return newBox;
};

Dom.getIframeDocument = function(target) {
    var doc = "";
    if (target.contentDocument) { // DOM
        doc = target.contentDocument;
    } else if (target.contentWindow) { // IE win
        doc = target.contentWindow.document;
    }
    return doc.body.innerHTML
}
Dom.hide = function (node) {
    node.style.display = "none";
};
Dom.show = function (node) {
    var name = node.localName.toLowerCase();
    node.style.display = (name == "box" ||  name == "vbox" || name == "hbox") ? "flex" : "block";
};

function DomVisibilityToggleHandler(control) {
    this.control = control;
}
DomVisibilityToggleHandler.prototype.positive = function() {
    this.control.style.display = "";
};
DomVisibilityToggleHandler.prototype.nagative = function() {
    this.control.style.display = "none";
};


var Browser = (function () {
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    var isEdge = !isIE && !!window.StyleMedia;
    return {
        // Opera 8.0+
        isOpera: isOpera,

        // Firefox 1.0+
        isFirefox: isFirefox,

        // Safari 3.0+ "[object HTMLElementConstructor]"
        isSafari: isSafari,

        // Internet Explorer 6-11
        isIE: isIE,

        // Edge 20+
        isEdge: isEdge,

        // Chrome 1+
        isChrome: isChrome,

        // Blink engine detection
        isBlink: isBlink,

        cssPrefix: (isIE || isEdge) ? "-ms-" : ((isChrome || isSafari || isBlink) ? "-webkit-" : (isOpera ? "-o-" : "-moz-"))
    };
})();

(function(window,document) {

    var prefix = "", _addEventListener, onwheel, support;

    // detect event model
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }

    // detect available wheel event
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        // handle MozMousePixelScroll in older Firefox
        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };

    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };

            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
    }

})(window,document);

//quert selector polyfill for :scope
try {
    // test for scope support
    document.createElement('a').querySelector(':scope *');
} catch (error) {
    console.log("Applying query selector scope polyfill for this old browser.");

    (function () {
        // scope regex
        var scope = /:scope\b/gi;

        // polyfilled <Element>.querySelector
        var querySelectorWithScope = polyfill(Element.prototype.querySelector);

        Element.prototype.querySelector = function querySelector(selectors) {
            return querySelectorWithScope.apply(this, arguments);
        };

        // polyfilled <Element>.querySelectorAll
        var querySelectorAllWithScope = polyfill(Element.prototype.querySelectorAll);

        Element.prototype.querySelectorAll = function querySelectorAll(selectors) {
            return querySelectorAllWithScope.apply(this, arguments);
        };

        function polyfill(originalQuerySelector) {
            return function (selectors) {
                // whether selectors contain :scope
                var hasScope = selectors && scope.test(selectors);

                if (hasScope) {
                    // element id
                    var id = this.getAttribute('id');

                    if (!id) {
                        // update id if falsey or missing
                        this.id = 'q' + Math.floor(Math.random() * 9000000) + 1000000;
                    }

                    // modify arguments
                    arguments[0] = selectors.replace(scope, '#' + this.id);

                    // result of the original query selector
                    var elementOrNodeList = originalQuerySelector.apply(this, arguments);

                    if (id === null) {
                        // remove id if missing
                        this.removeAttribute('id');
                    } else if (!id) {
                        // restore id if falsey
                        this.id = id;
                    }

                    return elementOrNodeList;
                } else {
                    // result of the original query sleector
                    return originalQuerySelector.apply(this, arguments);
                }
            };
        }
    })();
}

var navSpecHandlers = [];
function registerNavSpecHandler(pattern, handler) {
    navSpecHandlers.push({
        pattern: pattern,
        handler: handler
    });

    tryNavSpecHandlers();
}
function tryNavSpecHandlers() {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i < 0) return;

    var nav = url.substring(i + 1);
    if (!nav) return;
    for (var i = 0; i < navSpecHandlers.length; i ++) {
        var spec = navSpecHandlers[i];
        var m = spec.pattern.exec(nav);
        if (!m) continue;

        try {
            spec.handler.apply(window, m);
        } catch (e) { }
//        url = url.substring(0, i);
//        window.location.href = url;
        return;
    }
}
Dom.registerEvent(window, "load", tryNavSpecHandlers, false);
