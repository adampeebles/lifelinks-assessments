"use strict";

"use strict";

var q = require('q'),
    db = require('./postgresDB'),
    config = require('./databaseconfiguration')(),
    _ = require('lodash'),
    jwt = require('jsonwebtoken');

function Assessment(options) {
  this.opts = options || {};
}

// update the token w/ the jwt email/userid
function updateUserToken(user, cb){
  var token = Math.random().toString(36).slice(2);

  var sql = "INSERT INTO assessment_submissions (user_id, token) VALUES ($1, $2)";
  db.query(sql, [user.id, token]).then(
    function(results){
      cb(token);
    },
    function(err){
      console.error("error updating assessment user token", user.id);
      cb(null);
    }
  );
};

Assessment.prototype.upsertAnswer = function upsertAnswer(user, questionId, answer){
  var d = q.defer();

  var updSql = "UPDATE assessment_answers SET answer=$1, updated=current_timestamp "+
    "WHERE submission_id=$2 AND question_id=$3";
  db.query(updSql, [answer, user.submission_id, questionId]).then(
    function(results){
      // if no rows updated, then add the record
      if (results.rowCount === 0){
        var insSql = "INSERT INTO assessment_answers (submission_id, question_id, answer) VALUES ($1,$2,$3)";
        db.query(insSql, [user.submission_id, questionId, answer]).then(
          function(results){
            // inserted, all good
            d.resolve();
          },
          function(err){
            d.reject();
          }
        );
      }
      else{
        // updated. all good.
        d.resolve();
      }
    },
    function(err){
      d.reject();
    }
  );

  return d.promise;
};

Assessment.prototype.upsertAllAnswers = function upsertAllAnswers(user, answers){
  var d = q.defer();
  var index = 1;
  var updSql = "UPDATE assessment_answers SET answer=$1, updated=current_timestamp "+
    "WHERE submission_id=$2 AND question_id=$3";
  db.query(updSql, [answers[index], user.submission_id, index]).then(
    function(results){
      // if no rows updated, then add the record
      if (results.rowCount === 0){
        var insSql = "INSERT INTO assessment_answers (submission_id, question_id, answer) VALUES ($1,$2,$3)";
        db.query(insSql, [user.submission_id, index, answers[index]]).then(
          function(results){
            // inserted, all good
            d.resolve();
          },
          function(err){
            d.reject();
          }
        );
      }
      else{
        // updated. all good.
        d.resolve();
      }
    },
    function(err){
      d.reject();
    }
  );

  return d.promise;
};

Assessment.prototype.fetchUserByToken = function fetchUserByToken(token){
  var d = q.defer();

  // generate random token
  var sql = "SELECT u.id, u.email, s.id as submission_id FROM assessment_submissions s "+
    "INNER JOIN assessment_users u ON (s.user_id=u.id) "+
    "WHERE token=$1";
  db.query(sql, [token]).then(
    function(results){
      if (results.rowCount > 0){
        d.resolve(results.rows[0]);
      }
      else{
        d.reject();
      }
    },
    function(err){
      console.error("error fetching user", err, token);
      d.reject(err);
    }
  );

  return d.promise;
};

Assessment.prototype.upsertUserByEmail = function upsertUserByEmail(info){
  var d = q.defer();
  
  info.email = info.email.toLowerCase();

  var sql = "SELECT * FROM assessment_users WHERE email=$1";
  db.query(sql, [info.email]).then(
    function(results){
      if (results.rowCount === 0){
        // insert user w/ new email
        var insSql = "INSERT INTO assessment_users (email, first_name, last_name) VALUES ($1,$2,$3) RETURNING *";
        db.query(insSql, [info.email, info.firstName, info.lastName]).then(
          function(insResults){
            // update the user token w/ user id
            var user = insResults.rows[0];
            updateUserToken(user, function(token){
              user.token = token;
              d.resolve({
                user: user
              });
            });
          },
          function(err){
            console.error('error saving new assessment user', user.email);
            d.reject(err);
          }
        );
      }
      else{
        // update token for existing user
        var user = results.rows[0];
        updateUserToken(user, function(token){
          user.token = token;
          d.resolve({
            user: user
          });
        });
      }
    },
    function(err){
      d.reject(err);
    }
  );

  return d.promise;
};

Assessment.prototype.fetchArticles = function fetchArticles(token){
  var d = q.defer();

  var sql = "SELECT DISTINCT article.* FROM assessment_submissions sub "+
    "INNER JOIN assessment_answers a ON (sub.id=a.submission_id) "+
    "INNER JOIN assessment_questions_options opt ON (a.question_id=opt.question_id AND "+
        "("+
            "(modifier = 0 AND cast(a.answer AS integer)=opt.answer_value) OR "+
            "(modifier = -1 AND cast(a.answer AS integer) <= opt.answer_value) OR "+
            "(modifier = 1 AND cast(a.answer AS integer) >= opt.answer_value) "+
        ")) "+
    "INNER JOIN assessment_articles article ON (opt.article_id=article.id) "+
    "WHERE sub.token=$1";
  db.query(sql, [token]).then(
    function(results){
      d.resolve(results.rows);
    },
    function(err){
      d.reject();
    }
  );

  return d.promise;
};

module.exports = Assessment;
