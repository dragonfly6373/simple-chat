
var Util = (function () {
    function em() {
        if (Util._calculatedEM) return Util._calculatedEM;
        var div = document.createElement("div");
        var s = "mmmmmmmmmmmmmmmmmmmmmmmmmmm";
        div.innerHTML = s;
        document.body.appendChild(div);
        div.style.position = "absolute";
        div.style.top = "0px";
        div.style.opacity = "0";
        div.style.left = "0px";
        div.style.whiteSpace = "nowrap";

        Util._calculatedEM = div.offsetWidth / s.length;
        document.body.removeChild(div);
        return Util._calculatedEM;
    };
    function cropImage(image, centerCrop) {
        var w = image.naturalWidth;
        var h = image.naturalHeight;
        var W = image.parentNode.offsetWidth;
        var H = image.parentNode.offsetHeight;
        var r =  centerCrop === true ? Math.min(w / W, h / H) : Math.max(w / W, h / H);
        w = Math.round(w / r);
        h = Math.round(h / r);

        var dx = (W - w) / 2;
        var dy = (H - h) / 2;

        image.style.width = w + "px";
        image.style.height = h + "px";
        image.style.top = dy + "px";
        image.style.left = dx + "px";
        image.style.display = "inline-block";
        image.style.overflow = "hidden";
    }
    function contains(list, item, comparer) {
        return findItemByComparer(list, item, comparer) >= 0;
    }
    function sameList(a, b, comparer) {
        return containsAll(a, b, comparer) && containsAll(b, a, comparer);
    };
    function containsAll(a, b, comparer) {
        var c = comparer || sameId;
        for (var i = 0; i < b.length; i ++) {
            if (!contains(a, b[i], c)) return false;
        }

        return true;
    };
    function intersect(a, b, comparer) {
        if (!a || !b) return [];
        var items = [];
        for (var i = 0; i < a.length; i ++) {
            if (contains(b, a[i], comparer)) {
                items.push(a[i]);
            }
        }

        return items;
    };
    function sameRelax(a, b) {
        return a == b;
    }
    function sameId(a, b) {
        return a && b && a.id == b.id;
    }
    function findItemByComparer(list, item, comparer) {
        for (var i = 0; i < list.length; i ++) {
            if (comparer(list[i], item)) return i;
        }

        return -1;
    }
    function removeItemByComparer(list, item, comparer) {
        var result = [];
        for (var i = 0; i < list.length; i ++) {
            if (!comparer(list[i], item)) {
                result.push(list[i]);
            }
        }

        return result;
    }
    function find(list, matcher) {
        for (var i = 0; i < list.length; i ++) {
            if (matcher(list[i])) return list[i];
        }

        return null;
    }
    function findById(list, id) {
        return find(list, function (u) { return u.id == id; });
    }
    var uuidGenerator = {
        generateUUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
    };
    function newUUID () {
        var uuid = Util.uuidGenerator.generateUUID();
        return uuid.toString().replace(/[^0-9A-Z]+/gi, "");
    };
    var instanceToken = "" + (new Date()).getTime();
    function getInstanceToken () {
        return Util.instanceToken;
    };
    function enforceNumberInputHandler(e) {
        var event = Dom.getEvent(e);
        var input = Dom.getTarget(e);

        var delta = 0;
        if (event.keyCode == DOM_VK_UP) {
            delta = input._delta || 1;
        } else if (event.keyCode == DOM_VK_DOWN) {
            delta = -1 * (input._delta || 1);
        } else {
            return;
        }

        var x = input._integer ? parseInt(input.value, 10) : parseFloat(input.value);
        x += delta;
        if (input._min != null && typeof(input._min) != "undefined" && x < input._min) x = input._min;
        if (input._max != null && typeof(input._max) != "undefined" && x > input._max) x = input._max;

        var s = "" + x;
        if (input._paddingSize) {
            while (s.length < input._paddingSize) s = "0" + s;
        }

        input.value = s;
        input._lastGoodValue = input.value;
    };
    function enforceNumberInputChangeHandler(e) {
        var input = Dom.getTarget(e);
        var x = null;
        try {
            if (input.value && input.value.match(input._integer ? /^[0-9]+$/ : /^[0-9\.]+$/)) {
                x = input._integer ? parseInt(input.value, 10) : parseFloat(input.value);
            }

            if (isNaN(x)) x = null;
        } catch (e) {}

        if ((x == null && input.value.length > 0)
        || (!isNaN(x) && input._min != null && typeof(input._min) != "undefined" && x < input._min)
        || (!isNaN(x) && input._max != null && typeof(input._max) != "undefined" && x > input._max)) {
            input.value = input._lastGoodValue;
        } else {
            // input.value = input.value;
            input._lastGoodValue = input.value;
        }
    };
    function enforceNumberInput(input, isInteger, min, max, padding) {
        if (isInteger) input._integer = true;
        input._min = min;
        input._max = max;
        input._paddingSize = padding;

        try {
            var x = input._integer ? parseInt(input.value, 10) : parseFloat(input.value);
            if (isNaN(x)) x = null;
        } catch (e) {}

        if (x != null) {
            input._lastGoodValue = input.value;
        } else {
            input._lastGoodValue = "";
        }

        Dom.registerEvent(input, "keydown", enforceNumberInputHandler, false);
        Dom.registerEvent(input, "input", enforceNumberInputChangeHandler, false);
    };
    function dataURIToBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
        else
        byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }
    function idMapFunction(model) {
        return model.id;
    }

    return {
        em: em,
        cropImage: cropImage,
        contains: contains,
        sameList: sameList,
        containsAll: containsAll,
        intersect: intersect,
        findItemByComparer: findItemByComparer,
        removeItemByComparer: removeItemByComparer,
        find: find,
        findById: findById,
        uuidGenerator: uuidGenerator,
        newUUID: newUUID,
        instanceToken: instanceToken,
        getInstanceToken: getInstanceToken,
        sameRelax: sameRelax,
        enforceNumberInput: enforceNumberInput,
        dataURIToBlob: dataURIToBlob,
        idMapFunction: idMapFunction,
        linux: /Linux/.test(window.navigator.platform)
    }
} ());
