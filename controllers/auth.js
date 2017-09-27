var passport = require('passport');
var LocalStrategy = require ('passport-local');
var Teams = require ('models/team');
var log = require ('common/log');

var auth = {};

/*
 * Initialisation
 */

/** The local strategy **/
function __strategy (username, password, done) {
	Teams.findOne ({ name : username }, function (err, team) {
		if (err)
			return done (err);
	
		if (!team)
			return done (null, false);

		/** Saving as text for now **/
		if (team.password !== password)
			return done (null, false);

		return done (err, team);
	});
}


/** let passport know of our strategy **/
passport.use (new LocalStrategy (__strategy));

passport.serializeUser (function (team, done){
	done (null, team);
});

passport.deserializeUser (function (team, done){
	done (null, team);
});

/*
 * Actual handlers
 */

auth.authenticate = function (req, res, next) {

	passport.authenticate ('local', function (err, team) {
		if (err)
			return next (err);

		if (!team)
			return res.redirect ('/login');

		/** Log the team in **/
		req.logIn (team, function (err) {
			if (err)
				return next (err);

			return res.redirect ('/challenge');
		});
	}) (req, res, next);
};


module.exports = auth;
