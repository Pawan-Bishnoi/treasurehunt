var mongoose = require ('mongoose');

// make the level auto increment -- TODO
var schema = new mongoose.Schema ({
	level      : { type: Number, required: true},
	team       : { type: Number, required: true},
	statement  : { type: String, required: true, trim: true},
	answer     : { type: String, required: true, trim: true},
});


schema.methods.verifyAnswer = function (answer, cb) {
	return answer && (answer === this.answer);
};

schema.method ('toJSON', function () {
	return {
		id    : this._id,
		team  : this.team,
		level  : this.level,
		statement : this.statement
	};
});

module.exports = mongoose.model ('Level', schema);
