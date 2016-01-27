'use strict';

/* defining the app */
var app = angular
	.module('assesmentsApp', ['ngRoute','ngResource'])
	.config(function($routeProvider) {
	    $routeProvider
				.when('/',
					 {templateUrl: 'app/assesment.html'},
					 {controller: 'assesmentCtrl.js'}
					)
				.otherwise({redirectTo: '/'});
	});