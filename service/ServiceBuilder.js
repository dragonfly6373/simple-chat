var router = require("express").Router();

module.exports.build = function(controllers) {
    Object.getOwnProperties(controllers).forEach(function(controller) {
        if (typeof(controller) !== "function") return;
        console.log("init controller:", controller.name, controller);
        router.get(controller.name, controller);
    });
};