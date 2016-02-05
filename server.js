'use strict';

var Path = require('path');
const Hapi = require('hapi');
const pg = require('pg');
const server = new Hapi.Server();
const Boom = require('boom');
const  _ = require("lodash");
const  request = require('request');
const  config = require('./lib/databaseConfiguration.js')();
const  fs = require('fs');

server.connection({
    port: ~~process.env.PORT || 8000
});

server.ext('onRequest', function(request, reply) {
	console.log('Request received: ' + request.path);
	reply.continue();
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './client/src',
                listing: false,
                index: true
            }
        },
        config:{
            state:{
                parse: true,
                failAction:'ignore'
            },
            auth:false
        }
    });
    server.route(require('./lib/assessmentroutes'));
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
