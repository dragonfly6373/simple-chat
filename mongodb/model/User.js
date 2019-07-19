var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Gender = { Female: 0, Male: 1, Unknown: 2 };

module.exports.schema_name = "user";

module.exports.Gender = Gender;

module.exports = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	gender: { type: Number, default: Gender.Female }, 
	created_date: {
		type: Date,
		default: Date.now
	},
	deleted: {type: Boolean, default: false},
});
