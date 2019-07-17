var mongoose = require('mongoose');

var MongoDb = (function() {
    var DB_NAME = null;
    var __connection = null;
    function getConnection() {
        if (!__connection) {
            mongoose.connect(DB_NAME, {useNewUrlParser: true});
            __connection = mongoose;
        }
        return __connection;
    }
    function _find(clazz, condition, callback) {
        var Model = mongoose.model(clazz.schema_name, clazz.schema);
        Model.find(condition, function(error, data) {
            if (error) callback(error);
            else callback(data);
        });
    }
	return {
        connect: function(path, callback) {
            DB_NAME = path;
            __connection = getConnection();
            return this;
        },
        getConnection: getConnection,
        // create: function(clazz, callback) {
        //     var model = mongoose.model(clazz.schema_name, clazz.schema);
        //     model.save(function(error) {
        //         if (error) callback(error);
        //         else callback(true);
        //     });
        // },
        insert: function(clazz, data, callback) {
            var Model = mongoose.model(clazz.schema_name, clazz.schema);
            new Model(data).save(callback);
        },
        insertMulti: function(clazz, datalist, callback) {
            var Model = mongoose.model(clazz.schema_name, clazz.schema);
            // TODO: implement insertMulti
        },
        getAll: _find,
        getById: function(clazz, id, callback) {
            var Model = mongoose.model(clazz.schema_name, clazz.schema);
            Model.findById(id, function(error, data) {
                if (error) callback(error);
                else callback(data);
            });
        },
        bashUpdate: function(clazz, values, condition, callback) {
            _find(clazz, condition, function(error, data) {
                data.forEach(function(item) {
                    Object.getAllPropertyNames().forEach(function(key) {
                        item[key] = values[key];
                    });
                    item.save(function(error) {
                        if (error) callback(error);
                        else callback(true);
                    });
                });
            });
        },
        bashDelete: function(clazz, condition, callback) {
            _find(clazz, condition, function(error, data) {
                data.forEach(function(item) {
                    item.deleted = true;
                    item.save(function(error) {
                        if (error) callback(error);
                        else callback(true);
                    });
                });
            });
        },
        query: function(clazz, condition, callback) {
            // TODO: query by model
        }
    };
})();

module.exports = MongoDb;