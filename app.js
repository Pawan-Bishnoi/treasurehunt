require ('app-module-path').addPath (__dirname);

var express     = require ('express');
var passport    = require ('passport');
var session     = require ('express-session');
var ck_parser   = require ('cookie-parser');
var body_parser = require ('body-parser');
var db          = require ('common/db');
var log         = require ('common/log');
var config      = require ('common/config');
var admin       = require ('routes/admin');
var team        = require ('routes/team');
var path        = require ('path');

var app = express ();
var port = config.app.port || 5000;
var json_parser = body_parser.json();

/*
 * Using jade for html */
app.set ('view engine', 'pug');

/*
 * Global middlewares */
app.use (express.static (path.join(__dirname, 'public')));
app.use (json_parser);
app.use (session ({
	secret: 'bansal_ki_car',
	resave: true,
	saveUninitialized: true
}));
app.use (passport.initialize());
app.use (passport.session());

/*
 * Route demux */
app.use ('/admin', admin);
app.use ('/', team);

/*
 * Final error handler */
app.use (function (err, req, res, next){
	res.render ('error', {status: err.status || 400, message: (err.err || err.message)});
	return ;
});


/*
 * Get wheels rolling.. */
app.listen (port, function () {
	log.info ('***********************');
	log.info ('Rocking at port: ' + port + ' !');
	log.info ('***********************');
});
