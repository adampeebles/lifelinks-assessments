/**
 * Created by erick304 on 31/01/2016.
 */
app.controller('HeaderCtrl', ['$scope', 'articlesService', function($scope, articlesService) {
   $scope.articlesData = articlesService.getArticles();
    $scope.isRecommended = true;
}]);