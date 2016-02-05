module.exports = function(){
	var databaseconfiguration = null;
	if (process.env.aws_env==='PROD'){
		databaseconfiguration = require('./config_prod');
	}
	else if (process.env.aws_env==='STAGING'){
		databaseconfiguration = require('./config_staging');
	}
	else{
		databaseconfiguration = require('./config_dev');
	}
	return databaseconfiguration;
};
