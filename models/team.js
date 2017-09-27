var mongoose = require ('mongoose');

var schema = new mongoose.Schema ({
	name : { type: String, required: true, trim: true},
	password: { type: String, required: true, trim: true},
	level: { type: Number, default: 0},
});


schema.methods.verifyPassword = function (password, cb) {
	return password && (password === this.password);
};

schema.method ('toJSON', function () {
	return {
		_id : this._id,
		name : this.name,
		level : this.level
	};
});

module.exports = mongoose.model ('Team', schema);
