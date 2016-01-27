"use strict";

const q = require('q'),
	config = require('./databaseconfiguration')(),
	_ = require('lodash'),
	pg = require('pg');

pg.defaults.poolSize = 30;

var self = {};

self.connect = function(callback){
  pg.connect(config.db.connString, function(err, client, done) {
		if(err) {
	  	return console.error('could not connect to postgres', err);
		}

		if (_.isFunction(callback)){
	  	callback(client, done);
		}
  });
};

// start transaction
self.begin = function(){
	var d = q.defer();
	self.connect(function(client, done){
		self.query("BEGIN", null, client).then(
			function(){
				d.resolve(client, done);
			},
			function(err){
				done();
				d.reject(err);
			}
		);
	});
	return d.promise;
};

// commit trans
self.commit = function(client, done){
	return self.query('COMMIT', null, client, done);
};

// rollback trans
self.rollback = function(client, done){
	return self.query('ROLLBACK', null, client, done);
};

// query db w/ optional client for transactions
self.query = function(qry, params, client){
  var d = q.defer();

	if (_.isObject(client)){
		query(qry, params, client, null, d);
	}
	else{
		self.connect(function(client, done){
			query(qry, params, client, done, d);
	  });
	}

  return d.promise;
};

function query(qry, params, client, done, deferred){
	client.query(qry, params, function(err, result){
		// close connection, release back to pool
		if (_.isFunction(done)){
			done();
		}

	  if (err){
	    console.error("qry err", qry, err);
			deferred.reject(err);
			return;
	  }

  	deferred.resolve(result);
  });
}

module.exports = self;
