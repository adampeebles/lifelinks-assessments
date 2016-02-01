/**
 * Created by erick304 on 28/01/2016.
 */

app.factory('questionsFactory', function() {
    var questions = [
        {
            question: "At what stage of the solution finding process are you?",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            question: "How much help are you looking for?",
            options: ["1", "2", "3", "4", "5"]
        },
        {
            question: "About what specifically are you feeling overwhelmed?",
            options: ["Not enough time to take care of everything",
                      "Not enough information to be confident about decisions",
                      "My siblings and I can't agree with each other",
                      "My siblings and I agree with each other, but not with our parents",
                       "I've been doing this for so long, I'm just tired"]
        },
        {
            question: "Tell us more about your family's decision making process.",
            options: ["I gather the information and we make decisions together with equal influence.",
                      "I make all the decisions, then everyone else complains or second guesses me.",
                      "I make all the decisions and everyone else is very supportive.",
                      "There isn't anyone else involved."]
        },
        {
            question: "How urgent is your current situation?",
            options:  ["1", "2", "3", "4", "5"]
        },
        {
            question: "Which of the following best describes why you are close to or in a crisis now?",
            options:  ["Deadline imposed by outside party (hospital discharge, adult protective services, eviction notice, etc)",
                "The primary caregiver has reached the end of their rope",
                "We just received a difficult diagnosis",
                "An incident occurred causing us to be concerned about immediate safety (fire, car accident, wandering, abuse, etc)"]
        },
        {
            question: "How far away do you live from your loved one?",
            options:  ["Within 30 miles",
                "More than 30 miles"]

        },
        {
            question: "In what city and state does your aging loved one live?"
        }
    ];

    return {
        getQuestion: function(id) {
            if(id < questions.length) {
                return questions[id];
            } else {
                return false;
            }
        }
    };
});