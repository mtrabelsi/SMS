
var studentModule = angular.module('module.student', ['ngTable','xeditable']);

studentModule.controller('StudentController', function($scope,$rootScope,Toolbar,StudentService) {
  Toolbar.Window().maximize();

  StudentService.getAllStudents(function(stds) {
    console.log(stds);
  });

  $scope.students = [];

  $scope.checkName = function(data, id) {
     if (id === 2 && data !== 'awesome') {
       return "Username 2 should be `awesome`";
     }
   };

  $scope.saveStudent = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeStudent = function(index) {
    $scope.students.splice(index, 1);
  };

  // add user
  $scope.addStudent = function() {
    $scope.inserted = {
      id: $scope.students.length+1,
      name: '',
      status: null,
      group: null
    };
    $scope.students.push($scope.inserted);
  };

});
