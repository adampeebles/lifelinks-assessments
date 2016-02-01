var AssessmentHandlers = require('./assessmenthandlers');

var assessmentRoutes = [
						{
							method: 'POST',
						    path: '/api/assessment/',
						    handler: AssessmentHandlers.start,
						    config:{
						      auth: false
						    }
						},
						{
					        method: 'POST',
					        path: '/api/assessment/question/{id}',
					        handler: AssessmentHandlers.answer,
					        config:{
					          auth: false
					        }
      					},
					    {
					        method: 'GET',
					        path: '/api/assessment/',
					        handler: AssessmentHandlers.fetchArticles,
					        config:{
					          auth: false
					        }
					    },
					    {
					        method: 'GET',
					        path: '/api/assessment/{token}',
					        handler: AssessmentHandlers.fetchArticles,
					        config:{
					          auth: false
					        }
					    }
					 ];

module.exports =  assessmentRoutes;
