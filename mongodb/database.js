var mongoose = require("mongoose");
var dbUrl = require("../properties.js").DB;

module.exports = function() {
    mongoose.connect(dbUrl);

    mongoose.connection.on("connected", function() {
        console.log("Mongoose default connection is open to " + dbUrl);
    });

    mongoose.connection.on("error", function(err) {
        console.log("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on("disconnected", function() {
        console.log("Mongoose default connection is disconnected");
    });

    mongoose.connection.close(function(){
        console.log("Mongoose default connection is disconnected due to application termination");
    });
};

module.exports.create = function(Clazz, data, callback) {
    var user = new Clazz(data);
    user.save(callback);
};

module.exports.getById = function(Clazz, id, callback) {
    Clazz.find({_id: id}, callback);
};

module.exports.getALl = function(Clazz, query, callback) {
    Clazz.find(query, callback);
};

module.exports.updateById = function(Clazz, id, data, callback) {
    Clazz.findByIdAndUpdate(id, {$set: data}, {new: true}, callback);
};

module.exports.updateMany = function(Clazz, query, data, callback) {
    Clazz.updateMany(query, {$set: data}, callback);
};

module.exports.deleteById = function(Clazz, id, callback) {
    Clazz.findByIdAndUpdate(id, {$set: {deleted: true}}, callback);
};
