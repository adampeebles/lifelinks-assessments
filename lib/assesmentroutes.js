var AssessmentHandlers = require('./assesmenthandlers');

var assesmentRoutes = [
						{
							method: 'GET',
                            path: '/{path*}',
                            handler: {
                                directory: {
                                    path: './client/src',
                                    listing: false,
                                    index: true
                                }
                            },
						    config:{
						      auth: false
						    }
						},
						{
							method: 'POST',
						    path: '/start',
						    handler: AssessmentHandlers.start,
						    config:{
						      auth: false
						    }
						},
						{
					        method: 'POST',
					        path: '/question/{id}',
					        handler: AssessmentHandlers.answer,
					        config:{
					          auth: false
					        }
      					},
					    {
					        method: 'GET',
					        path: '/start',
					        handler: AssessmentHandlers.fetchArticles,
					        config:{
					          auth: false
					        }
					    },
					    {
					        method: 'GET',
					        path: '/{token}',
					        handler: AssessmentHandlers.fetchArticles,
					        config:{
					          auth: false
					        }
					    }
					 ];

module.exports =  assesmentRoutes;
