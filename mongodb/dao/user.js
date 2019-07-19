var mongoose = require("mongoose");
var schema = require("../model/User.js");

schema.statics = {
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    },
    getById: function(id, callback) {
        this.find({_id: id}, callback);
    },
    getALl: function(query, callback) {
        this.find(query, callback);
    },
    updateById: function(id, data, callback) {
        this.findByIdAndUpdate(id, {$set: data}, {new: true}, callback);
    },
    updateMany: function(query, data, callback) {
        this.updateMany(query, {$set: data}, callback);
    },
    deleteById: function(id, callback) {
        this.findByIdAndUpdate(id, {$set: {deleted: true}}, callback);
    }
};

var model = mongoose.model("user", schema);
module.exports = model;