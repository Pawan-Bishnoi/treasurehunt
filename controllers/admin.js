var Team = require ('models/team');
var Question = require ('models/question');

var admin = {};

admin.add_team = function (req, res, next) {
	var payload = req.body;
	var team = new Team (payload);
	team.save (function (err, team) {
		res.send ({ err: err, team: team });
		return ;
	});
};

admin.add_question = function (req, res, next) {
	var payload = req.body;
	var question = new Question (payload);
	question.save (function (err, _q) {
		res.send ({ err: err, question: _q });
		return ;
	});
};



module.exports = admin;
