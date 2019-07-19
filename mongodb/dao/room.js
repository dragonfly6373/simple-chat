var mongoose = require("mongoose");
var schema = require("../model/Room.js");

schema.statics = {

}

var model = mongoose.model(schema.schema_name, schema);
module.exports = model;
