/**
 * Created by erick304 on 28/01/2016.
 */
'use strict';

app.controller('UserCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.userSignUp = {};
    $scope.baseUrl = '/api/assessment/';
    $scope.signUp = signUpForm ;

    function signUpForm() {
        $scope.startAssessment = true;
        $http.post($scope.baseUrl, $scope.userSignUp).then(successSignUp, errorSignUp);
    }
    function successSignUp(result) {
        $location.path('/start');
    }
    function errorSignUp(result) {
        console.log(result);
    }
}]);