var Team = require ('models/team');
var Question = require ('models/question');
var config = require ('common/config');

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

admin.drop_questions = function (req, res, next) {
	if (!config.ops || config.ops.delete !== 'enabled') {
		return res.status (401).send ({message : 'option not available !'});
	}

	var payload = req.body;
	var query = {};
	query.team = payload.team;
	query.level = payload.level;

	var args = [];

	if (query.team || query.level)
		args.push (query);

	args.push (function (err, num){
		res.send ({err: err, num: num, query: query});
	});

	Question.remove.apply (Question, args);
};

admin.drop_teams = function (req, res, next) {
	if (!config.ops || config.ops.delete !== 'enabled') {
		return res.status (401).send ({message : 'option not available !'});
	}

	var payload = req.body;
	var query = {};
	query.name = payload.name;

	var args = [];

	if (query.name)
		args.push (query);

	args.push (function (err, num){
		res.send ({err: err, num: num, query: query});
	});

	Team.remove.apply (Team, args);
};

admin.get_teams = function (req, res, next) {
	var q_params = req.body/*query*/; //TODO: use query when api key comes in headers
	var name = q_params.name;
	var limit = 50;

	var obj;
	if (name)
		obj.name = name;

	var query = Team.find(obj);

	query.limit (limit);
	query.lean ();
	query.exec (function (err, teams){
		if (err) {
			return res.status (500).send ({err: err});
		}

		res.status (200).send (teams);
	});
};

admin.get_questions = function (req, res, next) {
	var q_params = req.body/*query*/;
	var team = q_params.team;
	var level = q_params.level;
	var limit = 50;

	var obj = {};
	obj.team = team;
	obj.level = level;

	var query;
	if (obj.team || obj.level) {
		query = Question.find(obj);
	}
	else {
		query = Question.find({});
	}

	query.limit (limit);
	query.lean ();
	query.exec (function (err, questions){
		if (err) {
			return res.status (500).send ({err: err});
		}

		res.status (200).send (questions);
	});
};

module.exports = admin;
