/**
 * Created by erick304 on 31/01/2016.
 */
app.factory('articlesService', function($http) {
    var baseUrl = '/api/assessment/';
    var articlesService = {};
    articlesService.articlesData = { articles:  [] };
    articlesService.requestArticles = function() {
       return $http.get(baseUrl);
    }
    articlesService.getArticles = function() {
        return this.articlesData;
    }
    return articlesService;
});