'use strict';

app.controller('assesmentCtrl', ['$scope','$http', function($scope,$http) {
 $scope.answers = [];
 $scope.userSignUp = {};
 $scope.startAssesment =false;

 function initializeAnswers() {
  for (var i = 0; i < 7; i++) {
     $scope.answers[i] = null;
  };
  $scope.answers[7] = { city: '', state: ''};
 }
  		
  $scope.signUp = function() {
    $scope.startAssesment =true;
    $http.post('/start', $scope.userSignUp).then(successCallback, errorCallback);
  }
  $scope.submitAnswers = function() {
     
       $http.post('/question/1', {answer: $scope.answers[0]}).then(function(result) {
           console.log(result);
            $http.post('/question/2', {answer: $scope.answers[1]}).then(function(result) {
                  console.log(result);
                 $http.post('/question/3', {answer: $scope.answers[2]}).then(function(result) {
                       console.log(result);
                     $http.post('/question/4', {answer: $scope.answers[3]}).then(function(result) {
                             $http.post('/question/5', {answer: $scope.answers[4]}).then(function(result) {
                                   console.log(result);
                                     $http.post('/question/6', {answer: $scope.answers[5]}).then(function(result) {
                                           console.log(result);
                                          $http.post('/question/7', {answer: $scope.answers[6]}).then(function(result) {
                                                console.log(result);
                                                $http.post('/question/8', {answer: $scope.answers[7]}).then(function(result) {
                                                     console.log(result);
                                                      $http.get('/start').then(function (response) {
                                                             console.log(response);
                                                        });
                                                }, errorCallback);
                                             }, errorCallback);
                                     }, errorCallback);
                             }, errorCallback);
                      }, errorCallback);
                 }, errorCallback);
            }, errorCallback);
       }, errorCallback);
      
      
  }
  
  function successGetArticles(results) {
      console.log(results.articles);
  }

  function successCallback(results) {
      console.log(results);   
  }
  function errorCallback() {
      alert('didnt work');
  }
  $scope.isAllQuestionAnswered = function() {
  	for (var i = 7; i >= 0; i--) {
  		if($scope.answers[i] === null){
  			return false;
  		}
  	};
  	if($scope.answers[7].city.length === 0 || $scope.answers[7].state.length === 0) return false;
  	return true;
  }

  initializeAnswers();

}]);