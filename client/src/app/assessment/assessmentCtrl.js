/**
 * Created by erick304 on 29/01/2016.
 */
(function(){
    'use strict';

    angular.module('assessmentsApp')
        .controller('AssessmentCtrl', ['articlesService', AssessmentCtrl])

    function AssessmentCtrl(articlesService) {
        var vm = this;
        vm.articles = [];
        vm.requestArticles = requestArticles;

        function requestArticles() {
            articlesService.requestArticles().then(function (response) {
                console.log(response.data.articles);
                vm.articles = response.data.articles;
                articlesService.articlesData.articles = vm.articles;
            });
        }
    }
})();



