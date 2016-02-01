/**
 * Created by erick304 on 29/01/2016.
 */
app.controller('AssessmentCtrl', ['$scope', 'articlesService', function($scope, articlesService) {
    $scope.requestArticles = function(){
        articlesService.requestArticles().then(function (response) {
            console.log(response.data.articles);
            $scope.articles = response.data.articles;
            articlesService.articlesData.articles = $scope.articles;
        });
    }


}]);