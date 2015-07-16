
var studentModule = angular.module('module.student', []);

studentModule.controller('StudentController', function($scope,Toolbar,LevelService,StudentService) {
  Toolbar.Window().maximize();


  $scope.students  = [];
  $scope.levels = [];
  $scope.classes = ['Jasmin','Violette','Rose','Dahlia','Lilas','Lys','Narcisse'];

  LevelService.getAllLevels(function(lvs) {
    $scope.levels = lvs;
    $scope.$apply();
  });

  StudentService.getAllStudents(function(sts) {
    $scope.students = sts;
    $scope.$apply();
  });
$scope.confirmDeletion = function(student) {
  $scope.toDeleteStudent = student;
}

$scope.upsert = function(student) {
  LevelService.getLevelById(student._levelId,function(level) {
    student.price = level.price;

    student.products =  {
        t1: {s:false,c:false,g:false,p:false,a:false},
        t2: {s:false,c:false,g:false,p:false,a:false},
        t3: {s:false,c:false,g:false,p:false,a:false}
      };

      StudentService.upsertStudent(student,function(st) {
        console.log('student added');
    });
  });

};
$scope.update = function(student) {

      StudentService.upsertStudent(student,function(st) {
        console.log('student added');
    });

};

$scope.delete = function (student) {

  StudentService.removeStudent(student,function(nbrRM) {
    if(nbrRM==1) {
        StudentService.getAllStudents(function(lvs) {
          $scope.students = lvs;
          $scope.$apply();
        });
    }else {
          $scope.students.pop();
          $scope.$apply();
    }
  });
};

$scope.deleteLastLine = function () {
 $scope.students.pop();
};

$scope.insertNewLine = function() {
    $scope.addedStudent = {
      firstname: '',
      lastname: '',
      _levelId: '',
      class: '',
      price : {}
    };

   $scope.students.push($scope.addedStudent);
};

$scope.loadPrices = function(student) {
  $scope.clickedStudent = student;
};

});
