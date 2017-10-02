var Question = require ('models/question');
var Team = require ('models/team');
var log = require ('common/log');
var team = {};

team.home = function (req, res, next) {

	var __team = req.user;
	var params = req.query;

	var query = {};
	query.level = __team.level || 0;
	query.team  = __team.name;


	Question.findOne (query, function (err, question) {
		if (err)
			return res.status (500).send (err);

		if (!question) {
			return res.render ('final', {message: 'Please contact the admins for futher rounds, Thanks :)'});
			//return res.status (200).send ({message: 'level #' + query.level + ' not found, have you completed all of em ?'});
		}

		if (req.xhr || params.api)
			return res.status (200).send (question);

		return res.render ('challenge', question);
	});
};

team.post = function (req, res, next) {
	var payload = req.body;
	var __team = req.user;

	log.debug ('New submission:: ', { team: __team, payload: payload });

	var answer = payload.answer;
	var obj;

	Question.findOne ({team: __team.name, level: __team.level}, function (err, ques){
		if (err || !ques.verifyAnswer /*!__matches*/ (answer)) {
			/*
			obj = ques.toObject ();
			obj.error = err || "didn't match";
			return res.render ('challenge', ques.toObjet()); */

			var err_str = err || 'didnt match!';
			return res.redirect ('/challenge?e='+ err_str);
		}

		/** found correct **/
		Team.findOne ({name: __team.name}, function (err, team) {
			if (err) {
				obj.error = err;
				return res.status (500).render ('challenge', obj);
			}

			team.level ++;
			__team.level ++;
			team.save (function (err, _t) {
				if (err) {
					obj.error = err;
					return res.status(500).render ('challenge', obj);
				}

				return res.redirect ('/challenge');
			});
		});
	});
};

module.exports = team;
