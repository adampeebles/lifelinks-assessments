'use strict';

var Path = require('path');
const Hapi = require('hapi');
const pg = require('pg');
const server = new Hapi.Server();
const Boom = require('boom');
const  _ = require("lodash");
const  request = require('request');
const  config = require('./lib/databaseConfiguration')();
const  fs = require('fs');

server.connection({ port: 3000 });

server.ext('onRequest', function(request, reply) {
	console.log('Request received: ' + request.path);
	reply.continue();
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route(require('./lib/assesmentroutes'));
    //server.route(require('./lib/articlesroutes'));
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});