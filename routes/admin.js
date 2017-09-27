var express = require ('express');
var config = require ('common/config');
var admin = require ('controllers/admin');

var router = express.Router ();

router.use (verify_key);

router.post ('/team', admin.add_team);
router.post ('/question', admin.add_question);


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
