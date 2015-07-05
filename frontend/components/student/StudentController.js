
var studentModule = angular.module('module.student', []);

loginModule.controller('StudentController', function($scope,$rootScope,Auth) {


$scope.logIn = function() {

    Auth.getUser($scope.form, function(user){
        if(user!=null){
          $rootScope.user.loggedin = true;
          $rootScope.user.object = user;
        }
    });
};

});
