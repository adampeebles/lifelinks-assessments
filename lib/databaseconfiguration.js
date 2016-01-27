module.exports = function(){
	var databaseConfiguration = null;
	if (process.env.aws_env==='PROD'){
		databaseConfiguration = require('./config_prod');
	}
	else if (process.env.aws_env==='STAGING'){
		databaseConfiguration = require('./config_staging');
	}
	else{
		databaseConfiguration = require('./config_dev');
	}
	return databaseConfiguration;
};
