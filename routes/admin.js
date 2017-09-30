var express = require ('express');
var config = require ('common/config');
var admin = require ('controllers/admin');

var router = express.Router ();

router.use (verify_key);

router.post ('/get-teams', admin.get_teams);
router.post ('/get-questions', admin.get_questions);


router.post ('/team', admin.add_team);
router.post ('/question', admin.add_question);


/* not in master */
router.delete ('/team', admin.drop_teams);
router.delete ('/question', admin.drop_questions);


/*
 * Verify shared secret key (specified in config file)
 * This is must for admin calls */
function verify_key (req, res, next) {
	var payload = req.body;

	if (payload.key === config.app.secret)
		return next ();

	console.log ('payload: ', payload);
	next ({err: 'tumse na ho payega'});
}

module.exports = router;
