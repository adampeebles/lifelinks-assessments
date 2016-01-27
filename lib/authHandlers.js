
userModel = require('../models/user'),
var User = new userModel();
function login(request, reply){

}

function logout(request, reply){
  User.logout(request.app.currentUser.id, request.state.token);

  reply({
    success: true
  });
}