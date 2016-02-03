(function () {
    'use strict';
    var directiveName = 'match';
    angular.module('assessmentsApp')
         .directive(directiveName, ['$parse', match]);

             function match($parse) {
                 var directive = {
                     link: link,
                     restrict: 'A',
                     require: '?ngModel'
                 };
                 return directive;

                 function link(scope, elem, attrs, ctrl) {

                     if (!ctrl) return;
                     if (!attrs[directiveName]) return;

                     var firstEmail = $parse(attrs[directiveName]);

                     var validator = function (value) {
                         var temp = firstEmail(scope),
                             v = value === temp;
                         ctrl.$setValidity(directiveName, v);
                         return value;
                     };

                     ctrl.$parsers.unshift(validator);
                     ctrl.$formatters.push(validator);
                     attrs.$observe(directiveName, function () {
                         validator(ctrl.$viewValue);
                     });

                 }
             }
})();