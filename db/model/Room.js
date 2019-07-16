var mongoose = require("mongoose");

var Room = function(db) {
	var db = db;
	var schema = mongoose.Schema({
		name: String,
		email: String,
		address: String,
		phone: String,
		gender: Int,
		created_date: {
			type: Date,
			default: Date.now
		}
	});
	return {
		get: function(callback) {
			var model = mongoose.model("user", schema);
			model.find(callback).limit(1);
		},
		list: function(callback, limit) {

		},
		create: function(data, callback) {

		},
		update: function(id, data, callback) {

		},
		delete: function(id, callback) {

		}
	}
};

module.exports = Room;