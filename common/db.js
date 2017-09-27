var mongoose = require ('mongoose');
var config   = require ('common/config');
var log      = require ('common/log');

var connection = mongoose.connection;

connection.on ('open', function () {
	log.info ('database connection open!');
});

connection.on ('error', function (err) {
	log.error ('database connect error', err);
});

connection.on ('connected', function () {
	log.info ('database connect ok!');
});

connection.on ('disconnected', function () {
	log.error ('database disconnected !');
});

mongoose.connect (config.db.url);

module.exports = connection;
