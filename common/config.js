var config = {};

config.app = {
	port : 5000,
	secret : 'namashkaar'          // WARN : Use your own key here !
};

config.db = {
	url : "mongodb://localhost/hunt"
};


if (process.env.PORT) {
	/*
	 * Must be Heroku
	 * configure accordingly !
	 */

	config.app.port = process.env.PORT;
	config.app.env = 'prod';
	config.db.url = 'mongodb://not_a_robot:Computer1@cluster0-shard-00-00-k9p7y.mongodb.net:27017,cluster0-shard-00-01-k9p7y.mongodb.net:27017,cluster0-shard-00-02-k9p7y.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
}

module.exports = config;
