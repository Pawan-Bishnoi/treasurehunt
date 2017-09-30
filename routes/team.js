var express = require('express');
var auth = require ('controllers/auth');
var team = require ('controllers/team');
var log = require ('common/log');

var router = express.Router ();

router.post ('/login', auth.authenticate);

/** Must be authenticated **/
router.use (ensure_authenticated);

router.get  ('/challenge', team.home);
router.post  ('/challenge', team.post);



function ensure_authenticated (req, res, next) {
	if (!req.isAuthenticated || !req.isAuthenticated ()) {
		log.error ('Found not authenticated on route ' + req.url, 'redirecting back to login');
		res.render ('login');
		return;
	}

	log.debug ('auth found ok!');

	/** Auth ok, please proceed.. **/
	next ();
}

module.exports = router;
