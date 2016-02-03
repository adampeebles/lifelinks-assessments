/**
 * Created by erick304 on 28/01/2016.
 */
(function(){
    'use strict';

    angular.module('assessmentsApp')
        .directive('assessment',['$http', 'questionsFactory',assessment]);

    function assessment($http, questionsFactory) {
          return {
            restrict: 'AE',
            scope : {} ,
            templateUrl: 'app/assessment/assessmentTemplate.html',
            link: function(scope, elem, attrs) {
                scope.start = startAssessment;
                scope.getQuestion = getQuestion;
                scope.saveAnswer = saveAnswer;
                scope.nextQuestion = getNextQuestion;
                scope.checkItsAnswered = checkItsAnswered;

                function checkItsAnswered() {
                    if(scope.id === 7){
                         if(scope.location.city === '' || scope.location.state === '') return false;
                        scope.actualAnswer = scope.location;
                        return true;
                    }else{
                       if(scope.actualAnswer !== -1)
                            return true;
                    }
                }
                function saveAnswer(saveSuccessfully) {
                    var finalAnswer  =  scope.actualAnswer;
                    if(scope.questionNumber < 7) {
                        finalAnswer++;
                    }
                    $http.post('/api/assessment/question/' + scope.questionNumber, { answer: finalAnswer }).then(saveSuccessfully,errorSavingQuestion);
                }
                function startAssessment() {
                    scope.id = 0;
                    scope.actualAnswer = -1;
                    scope.questionNumber = 1;
                    scope.isAnswered = true;
                    scope.errorMessage = 'Please select an option or fill fields required!';
                    scope.location = { city:'', state: ''};
                    scope.getQuestion();
                }
                function getQuestion() {
                    var actualQuestion = questionsFactory.getQuestion(scope.id);
                    if(scope.id === 7) scope.lastQuestion = true;
                    if(actualQuestion) {
                        scope.question = actualQuestion.question;
                        scope.options = actualQuestion.options;
                    } else {
                        scope.$parent.vm.assessmentOver= scope.assessmentOver  = true;
                        scope.$parent.vm.requestArticles();
                    }
                }
                function getNextQuestion() {

                    scope.isAnswered = checkItsAnswered();
                    if(!scope.isAnswered) return;
                    scope.saveAnswer(function(result){
                        switch(scope.id){
                            case 1:
                                scope.id = scope.actualAnswer < 3 ?  3 : 2;
                                break;
                            case 4:
                                scope.id = scope.actualAnswer < 3 ? 6 : 5;
                                break;
                            default:
                                scope.id++;
                        }
                        scope.questionNumber = scope.id + 1;
                        scope.actualAnswer = -1;
                        scope.getQuestion();
                    });
                }
                function errorSavingQuestion() {
                    console.log('An unexpected error happened while saving the answer');
                }
                startAssessment();
            }
        }
    }
})();
