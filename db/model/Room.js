
var Room = function(mongoose) {
	return {
		schema_name: "room",
		schema: mongoose.Schema({
			name: String,
			title: String,
			member: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
			created_date: {
				type: Date,
				default: Date.now
			}
		})
	};
};

module.exports = Room;