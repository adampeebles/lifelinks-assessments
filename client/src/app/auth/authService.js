/**
 * Created by erick304 on 02/02/2016.
 */
(function() {
    'use strict';

    angular.module('assessmentsApp')
        .factory('authService',auth);

        function auth() {
            var user = {
                isAuthenticated: false
            };

            return {
                setAuthentication: function (isAuthenticated) {
                    user.isAuthenticated = isAuthenticated;
                },
                isLoggedIn: function () {
                    return (user.isAuthenticated) ? user.isAuthenticated : false;
                }
            }
        }

})();