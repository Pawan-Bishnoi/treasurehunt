var config = {};

config.app = {
	port : 5000,
	secret : 'namashkaar'          // WARN : Use your own key here !
};

config.db = {
	url : "mongodb://localhost/hunt"
};

module.exports = config;
