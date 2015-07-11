
var studentModule = angular.module('module.student', ['ngTable','xeditable','mgcrea.ngStrap','ngAnimate']);

studentModule.controller('StudentController', function($scope,$rootScope,Toolbar) {
  Toolbar.Window().maximize();
/*
  $scope.students  = [];

  StudentService.getAllStudents(function(lvs) {
    $scope.students = lvs;
    $scope.$apply();
  });
$scope.confirmDeletion = function(student) {
  $scope.toDeleteStudent = student;
}

$scope.upsert = function(student){
  StudentService.upsertStudent(student,function(lv) {
    console.log('student saved/updated' + lv);
  });
};

$scope.delete = function (student) {
  StudentService.removeStudent(student,function(nbrRM) {
    if(nbrRM==1){
        StudentService.getAllStudents(function(lvs) {
          $scope.students = lvs;
          $scope.$apply();
        });
    }
  });
};

$scope.deleteLastLine = function () {
 $scope.students.pop();
};

$scope.insertNewLine = function() {
    $scope.addedStudent = {
      _id: '',
      price : {
          t1: {s:0,c:0,g:0,p:0,a:0},
          t2: {s:0,c:0,g:0,p:0,a:0},
          t3: {s:0,c:0,g:0,p:0,a:0}
        }
    };

   $scope.students.push($scope.addedStudent);
};

$scope.loadPrices = function(student) {
  $scope.clickedStudent = student;
};
*/
});
