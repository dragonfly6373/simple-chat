var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports.schema_name = "room";

var Room = new Schema({
	name: String,
	title: String,
	member: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
	created_date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Room;