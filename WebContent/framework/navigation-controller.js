// if (!window.HashChangeEvent)
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
