var mongoose = require("mongoose");
var dbUrl = require("../properties.js").DB;

function _connect() {
    console.log("# mongodb try to connect", dbUrl);
    if (mongoose.connection.readyState != 1) {
        mongoose.connect(dbUrl, {useNewUrlParser: true});
        mongoose.connection.on("error", function(error) {
            console.log("Fail to connection mongodb with error:", error);
        });
    }
}

function newModel(Clazz) {
    return mongoose.model(Clazz);
}
function DataAdapter() {

}
    DataAdapter.prototype.create = function(Clazz, data, callback) {
        _connect();
        var Model = newModel(Clazz);
        var model = new Model(data);
        model.save(callback);
    };

    DataAdapter.prototype.getById = function(Clazz, id, callback) {
        _connect();
        var Model = newModel(Clazz);
        Model.find({_id: id}, callback);
    };

    DataAdapter.prototype.getALl = function(Clazz, query, callback) {
        _connect();
        var Model = newModel(Clazz);
        Model.find(query, callback);
    };

    DataAdapter.prototype.updateById = function(Clazz, id, data, callback) {
        _connect();
        var Model = newModel(Clazz);
        Model.findByIdAndUpdate(id, {$set: data}, {new: true}, callback);
    };

    DataAdapter.prototype.updateMany = function(Clazz, query, data, callback) {
        _connect();
        var Model = newModel(Clazz);
        Model.updateMany(query, {$set: data}, callback);
    };

    DataAdapter.prototype.deleteById = function(Clazz, id, callback) {
        _connect();
        var Model = newModel(Clazz);
        Model.findByIdAndUpdate(id, {$set: {deleted: true}}, callback);
    }

module.exports = DataAdapter;