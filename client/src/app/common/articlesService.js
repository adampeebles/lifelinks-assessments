/**
 * Created by erick304 on 31/01/2016.
 */
(function() {
    'use strict'
    angular.module('assessmentsApp')
        .factory('articlesService', articlesService);
            function articlesService($http) {
                var baseUrl = '/api/assessment/';
                var articlesService = {};
                articlesService.articlesData = {articles: []};
                articlesService.requestArticles = function () {
                    return $http.get(baseUrl);
                }
                articlesService.getArticles = function () {
                    return this.articlesData;
                }
                return articlesService;
            }
})();