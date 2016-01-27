var authRoutes = [
						{
							method: 'POST',
       						path: '/login',
        				    handler: login,
					        config:{
					          auth: false
					        } 
						},
						{
							method: 'POST',
        					path: '/logout',
       						handler: logout
						}
				 ];

module.exports =  authRoutes;
