  "use strict";

  var Hapi = require('hapi'),
      _ = require('lodash'),
      qs = require('querystring'),
      fs = require('fs'),
      config = require('./databaseconfiguration')(),
      userModel = require('./user'),
      assessmentModel = require('./assessment'),
      articleModel = require('./articles'),
      jwt = require('jsonwebtoken'),
      request = require('request');

  var User = new userModel(),
      Assessment = new assessmentModel(),
      Article = new articleModel();

function getRecommendedArticles(token, cb){
  Assessment.fetchArticles(token).then(
    function(articles){
      cb(articles);
    },
    function(err){
      cb();
    }
  );
};

function showArticle(request, reply, article){
  var data = {
    article: article
  };

  if (request.state.assessmentToken){
    getRecommendedArticles(request.state.assessmentToken, function(recommended){
      data.recommended = recommended;
      reply.view('client/src/app/views/articles/'+article.url, data, {layout: 'article'});
    });
  }
  else{
    reply.view('client/src/app/views/articles/'+article.url, data, {layout: 'article'});
  }
}

// article cache so we dont have to ping the db everytime
var articles = {};

// fetch content based on url
function getContent(request, reply){
  // check cache for a copy
  if (_.isObject(articles[request.params.article])){
    showArticle(request, reply, articles[request.params.article]);
  }
  else{
    Article.fetch(request.params.article).then(
      function(article){
        articles[article.url] = article;
        showArticle(request,reply,article);
      },
      function(err){
        reply.view('client/src/app/views/layouts/404').code(404);
      }
    );
  }
}



 var articlesRoutes = [
     {

      method: 'GET',
	  path: '/articles/{article*}',
	  handler: getContent,
	  config:{
			auth: false
	  }
    }];

module.exports = articlesRoutes;

