// if (!window.HashChangeEvent)

function __setHash(widget) {
    var hash = widget.getHash();
}

var NavigationModule = function() {

}

NavigationModule.prototype.navigate = function(hash) {
    
}

NavigationModule.__proto__ = function() {
    var _register = {};
    var _viewer = null;
    function register(name, widget) {
        console.log("register new hash:", name);
        if (_register.name != null) {
            _register.name = widget;
        }
    }
    function setView(node) {
        _viewer = node;
    }
    function implement(hash, options) {
        var impl = _register[hash];
        if (!_viewer) console.log("set view first");
        if (!hash) {
            console.log("page not be found with hash", hash);
        }
        impl = new impl(options);
        _viewer.innerHTML = "";
        impl.into(_viewer);
    }

    return {
        register: register,
        setView: setView,
        implement: implement
    };
};

(function(){
    var lastURL = document.URL;
    console.log("# Catch HashChange event");
    window.addEventListener("hashchange", function(event){
        Object.defineProperty(event, "oldURL", {enumerable:true, configurable:true,value:lastURL});
        Object.defineProperty(event, "newURL", {enumerable:true, configurable:true,value:document.URL});
        lastURL = document.URL;
        console.log("Old URL:", event.oldURL);
        console.log("New URL:", event.newURL);
    });
}());
