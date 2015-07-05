
var loginModule = angular.module('module.login', []);


loginModule.controller('LoginController', function($scope,$rootScope,Auth,$state) {

$rootScope.user = {
  loggedin: false,
  object: {}
};

$scope.form = {
  username : 'admin',
  password: '0000'
};

$scope.logIn = function() {

    Auth.getUser($scope.form, function(user){
        if(user!=null){
          $rootScope.user.loggedin = true;
          $rootScope.user.object = user;
          $state.go('student');
        }
    });
};

});
