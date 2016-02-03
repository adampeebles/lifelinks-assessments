/**
 * Created by erick304 on 28/01/2016.
 */

(function() {
    'use strict';
    angular.module('assessmentsApp')
        .controller('UserCtrl', ['$http', '$location', 'authService', UserCtrl])

            function UserCtrl($http, $location, authService) {
                var vm = this;
                vm.userSignUp= {};
                vm.baseUrl = '/api/assessment/';
                vm.signUp = signUpForm;

                function signUpForm() {
                    vm.startAssessment = true;
                    $http.post(vm.baseUrl, vm.userSignUp).then(successSignUp, errorSignUp);
                }

                function successSignUp(result) {
                    authService.setAuthentication(true);
                    $location.path('/start');
                }

                function errorSignUp(result) {
                    console.log(result);
                }
            }
})();