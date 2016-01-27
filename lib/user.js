"use strict";

var q = require('q'),
  db = require('./postgresDB'),
  config = require('./databaseConfiguration')(),
  _ = require('lodash'),
  jwt = require('jsonwebtoken');

function User(options) {
  this.opts = options || {};
}

function loginUser(user){
  var d = q.defer();

  var token = jwt.sign({
    userId: user.id,
    twitter: user.twitter_name
  }, config.jwt.privateKey);

  // store token in auth table for user
  var sql = "INSERT INTO auth (user_id, token) VALUES ($1, $2)";
  var params = [user.id, token];

  db.query(sql, params).then(
    function(result){
      d.resolve({
        user: user,
        token: token
      });
    },
    function(err){
      d.reject(err);
    }
  );

  return d.promise;
}

User.prototype.getUserByToken = function getUserByToken(token){
  var d = q.defer();

  if (!_.isString(token)){
    d.reject({
      message: 'Invalid token'
    });
    return d.promise;
  }

  var sql = "SELECT u.* FROM auth a INNER JOIN users u ON (a.user_id=u.id) "+
    "WHERE a.token=$1";
  db.query(sql, [token]).then(
    function(results){
      if (results.rowCount>0){
        d.resolve(results.rows[0]);
      }
      else{
        d.reject();
      }
    },
    function(err){
      d.reject(err);
    }
  );

  return d.promise;
};

User.prototype.login = function login(twitter){
  var d = q.defer();

  var sql = "UPDATE users SET twitter_token=$1, twitter_secret=$2, avatar=$3, last_login=current_timestamp "+
    " WHERE twitter_id=$4 RETURNING id, twitter_name, avatar";
  db.query(sql, [twitter.oauth_token, twitter.oauth_token_secret, twitter.avatar, twitter.user_id]).then(
    function(results){
      if (results.rowCount===0){
        return createUser(twitter);
      }
      else{
        return results.rows[0];
      }
    }
  )
  .then(loginUser)
  .then(
    function(results){
      d.resolve(results);
    },
    function(err){
      d.reject(err);
    });

  return d.promise;
};

User.prototype.logout = function logout(userId, token){
  var d = q.defer();

  var sql = "DELETE FROM auth WHERE user_id=$1 and token=$2";
  db.query(sql, [userId, token]).then(
    function(){
      d.resolve();
    },
    function(err){
      console.error("error logging out", err);
      d.reject(err);
    }
  );

  return d.promise;
};

module.exports = User;
