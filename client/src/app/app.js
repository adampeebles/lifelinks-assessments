'use strict';

/* defining the app */
angular.module('assessmentsApp', ['ngRoute'])
	.config(config)
	.run(['$rootScope', '$location', 'authService', runApp]);

    function config($routeProvider) {
	    $routeProvider
				.when('/', {
                        templateUrl: 'app/user/userForm.html',
                        controller: 'UserCtrl',
                        controllerAs: 'vm'
                })
                .when('/start', {
                    templateUrl: 'app/assessment/assessment.html',
                    controller: 'AssessmentCtrl',
                    controllerAs: 'vm'
                })
		    	.when('/articles/creating-a-plan',
				{	templateUrl: 'app/views/articles/creating-a-plan.html'

				})
				.when('/articles/family-dynamics',
				{	templateUrl: 'app/views/articles/family-dynamics.html'
				})
				.when('/articles/interpreter',
				{	templateUrl: 'app/views/articles/interpreter.html'
				})
				.when('/articles/long-distance',
				{	templateUrl: 'app/views/articles/long-distance.html'
				})
				.when('/articles/sister',
				{	templateUrl: 'app/views/articles/sister.html'
				})
				.when('/articles/two-places-at-once',
				{	templateUrl: 'app/views/articles/two-places-at-once.html'
				})
				.otherwise({redirectTo: '/'});
	};

function runApp($rootScope, $location, authService) {
	$rootScope.$on('$routeChangeStart', function (event) {

		if (!authService.isLoggedIn()) {
			console.log('DENY');
			//event.preventDefault();
			$location.path('/');
		}
		else {
			console.log('ALLOW');
			$location.path('/start');
		}
	});
}