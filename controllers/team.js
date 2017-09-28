var Question = require ('models/question');
var log = require ('common/log');
var team = {};

team.home = function (req, res, next) {

	var __team = req.user;

	var query = {};
	query.level = __team.level || 0;
	query.team  = __team.name;


	Question.find (query, function (err, question) {
		if (err)
			return res.status (500).send (err);

		if (!question)
			return res.status (400).send ({err: 'NOT_FOUND'});

		if (req.xhr)
			return res.status (200).send (question);

		return res.render ('challenge', question);
	});
};


module.exports = team;
