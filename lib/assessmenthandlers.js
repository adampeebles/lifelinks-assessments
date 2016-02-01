var Hapi = require('hapi'),
    _ = require('lodash'),
    qs = require('querystring'),
    config = require('./databaseconfiguration')(),
    userModel = require('./user'),
    assessmentModel = require('./assessment'),
    jwt = require('jsonwebtoken'),
    request = require('request');

var AssessmentHandlers = {};

var User = new userModel(),
    Assessment = new assessmentModel();

AssessmentHandlers.start = function(req, reply) {
  // upsert the user and get a token back for this question session
  Assessment.upsertUserByEmail(req.payload).then(
    function(results){
      reply().state('assessmentToken', results.user.token);
    },
    function(err){
      reply().code(400);
    }
  );
}

AssessmentHandlers.answer = function(req,reply) {
  var questionId = req.params.id;

  // fetch assessment_users based on token via cookie
  Assessment.fetchUserByToken(req.state.assessmentToken).then(
    function(user){
      // upsert into assessment_answers w/ questionid
      Assessment.upsertAnswer(user, questionId, req.payload.answer).then(
        function(answer){
          reply({
            success:true
          });
        },
        function(err){
          reply({
            success:false,
            message: 'Error saving answer.'
          });
        }
      );
    },
    function(err){
      reply({
        success:false,
        message: 'Could not find user with this token.'
      });
    }
  );
}

AssessmentHandlers.fetchArticles = function(req,reply) {
  var token = req.params.token || req.state.assessmentToken;

  Assessment.fetchArticles(token).then(
    function(articles){
      reply({
        articles: articles
      });
    },
    function(err){
      reply().code(400);
    }
  );
}

module.exports = AssessmentHandlers;