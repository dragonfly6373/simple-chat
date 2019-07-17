var User = function(mongoose) {
	var Gender = { Female: 0, Male: 1, Unknown: 2 };
	return {
		schema_name: "user",
		schema: mongoose.Schema({
			name: {type: String, required: true },
			email: {type: String, required: true },
			gender: {type: Number, default: Gender.Female}, 
			created_date: {
				type: Date,
				default: Date.now
			},
			deleted: Boolean,
		}),
		Gender: Gender
	};
}

module.exports = User;
