var mongoose = require ('mongoose');

// make the level auto increment -- TODO
var schema = new mongoose.Schema ({
	level      : { type: Number, required: true},
	team       : { type: String, required: true, trim: true},
	statement  : { type: String, required: true, trim: true},
	answer     : { type: String, required: true, trim: true},
	url        : { type: String, trim: true}
});

// team + level is the composite key here
schema.index ({team: 1, level: 1}, {unique: true});

schema.methods.verifyAnswer = function (answer) {
	return answer && (answer === this.answer);
};

schema.method ('toJSON', function () {
	return {
		id    : this._id,
		url   : this.url,
		team  : this.team,
		level  : this.level,
		statement : this.statement
	};
});

module.exports = mongoose.model ('Question', schema);
