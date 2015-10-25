var studentModule = angular.module('module.student', []);

studentModule.controller('StudentController', function(_, $q, levels, $filter, ngTableDefaults ,$rootScope, $scope, NgTableParams, Toolbar, LevelService, StudentService, students) {
    Toolbar.Window().maximize();

    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];
    // $scope.classes = ['Jasmin', 'Violette', 'Rose', 'Dahlia', 'Lilas', 'Lys', 'Narcisse'];


$scope.getLevels = function () {
    var defer = $q.defer();
    LevelService.getAllLevels().then(function(lvs) {
    if(lvs)
        defer.resolve(lvs);  
    else
        defer.reject('erreur inconnue');
    });

    return defer.promise;
};


    $scope.toDeleteStudent = {};
    $scope.toEditStudent = {};
    $scope.toInserStudent = {};

    $scope.students = students;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });


    $scope.updateStudent = function(student) {
        StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};
        });
    }

    $scope.insertStudent = function(student) {
        indexToBeRetrieved = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        student.price = $scope.levels[indexToBeRetrieved].price;

        student.products = {
            t1: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t2: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t3: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            }
        };

        StudentService.upsertStudent(student).then(function(std) {

            $scope.students.push(std);
            $scope.tableParams.reload();
            $scope.toInserStudent = {};
        }, function(error) {
            alert('Impossible de créer cet Eleve, detail : ' + error);
        });
    }

    $scope.deleteStudent = function(student) {
        StudentService.removeStudent(student).then(function(numDeleted) {
            indexToBeDeleted = _.indexOf(_.pluck($scope.students, '_id'), student._id);
            $scope.students.splice(indexToBeDeleted, 1);
            $scope.tableParams.reload();
            $scope.toDeleteStudent = {};
        }, function(error) {
            alert('Impossible de supprimer cet Eleve, detail : ' + error);
        });
    }

    $scope.loadEditedStudent = function(student) {
        $scope.toEditStudent = student;
    }
    $scope.loadDeletedStudent = function(student) {
        $scope.toDeleteStudent = student;
    }
    $scope.loadInsertedStudent = function() {
       
        $scope.toInserStudent = {};
    }


    //unpayed 
    $scope.checkedTrimester = '';


    $scope.tableParamsUnpayed = new NgTableParams({
        count: $scope.students.length
    }, {
        getData: getData
    });

    function getData(params) {

       var   filtredData    = $filter('filter')($scope.students, params.filter());
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());
       var filtredData2 = [];         
        if($scope.checkedTrimester!=''){ 
            filtredData.forEach(function(student) {
                if(student.products[$scope.checkedTrimester].s==false){
                    filtredData2.push(student);
                }
            })
        }
        
       return filtredData2;
    }

    $scope.filterTable =  function(){
            $scope.tableParamsUnpayed.reload();
    };

    
    
});
