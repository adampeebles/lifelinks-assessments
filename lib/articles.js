"use strict";

var q = require('q');
var  db = require('./postgresDB');
var config = require('./databaseconfiguration')();
var  _ = require('lodash');
var jwt = require('jsonwebtoken');

function Article(options) {
  this.opts = options || {};
}

Article.prototype.fetchAll = function fetchAll(){
  var d = q.defer();

  var sql = "SELECT * FROM assessment_articles WHERE active=true";
  db.query(sql, []).then(
    function(results){
      if (results.rowCount>0){
        d.resolve(results.rows);
      }
      else{
        d.reject();
      }
    },
    function(err){
      d.reject();
    }
  );

  return d.promise;
};

Article.prototype.fetch = function fetch(url){
  var d = q.defer();

  var sql = "SELECT * FROM assessment_articles WHERE url=$1 AND active=true";
  db.query(sql, [url]).then(
    function(results){
      if (results.rowCount>0){
        d.resolve(results.rows[0]);
      }
      else{
        d.reject();
      }
    },
    function(err){
      d.reject();
    }
  );

  return d.promise;
};

module.exports = Article;
