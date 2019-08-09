// if (!window.HashChangeEvent)

function __setHash(widget) {
    var hash = widget.getHash();
}

var NavigationModule = (function() {
    var _viewer = null;
    var _currentActive = null;
    function setViewer(node) {
        _viewer = node;
    }
    function implement(feature, options) {
        if (!_viewer) {
            console.log("set view first");
            return;
        }
        var hash = feature.name;
        var impl = new feature.implemenation(options);
        _viewer.innerHTML = "";
        impl.into(_viewer);
    }
    function hashChange(oldHash, newHash) {

    }

    return {
        setView: setView,
        implement: implement,
        hashChange: hashChange
    };
})();

(function(){
    var lastURL = document.URL;
    console.log("# Catch HashChange event");
    function getHash(url) {
        var matching = url.match(/#\/([\w+[\/w+]*)/);
        if (!matching || matching.length < 2) return "";
        return matching[1];
    }
    window.addEventListener("hashchange", function(event){
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true,value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true,value:document.URL});
        lastURL = document.URL;
        console.log("Old hash:", getHash(event.oldURL));
        console.log("New hash:", getHash(event.newURL));
    });
}());
