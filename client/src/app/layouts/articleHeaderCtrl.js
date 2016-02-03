/**
 * Created by erick304 on 31/01/2016.
 */
(function() {
    'use strict';
    angular.module('assessmentsApp')
        .controller('ArticleHeaderCtrl', ['articlesService', HeaderCtrl]);

        function HeaderCtrl(articlesService) {
            var vm = this;
            vm.articlesData = articlesService.getArticles();
            vm.isRecommended = true;
        }
})();