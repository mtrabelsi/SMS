var studentModule = angular.module('module.student', []);

studentModule.controller('StudentController', function(_, $q, $scope, NgTableParams, Toolbar, LevelService, StudentService, students) {
    Toolbar.Window().maximize();

    $scope.toDeleteStudent = {};
    $scope.toEditStudent = {};
    $scope.toInserStudent = {};

    $scope.students = students;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });

    $scope.levels = [];
    $scope.classes = ['Jasmin', 'Violette', 'Rose', 'Dahlia', 'Lilas', 'Lys', 'Narcisse'];

    LevelService.getAllLevels().then(function(lvs) {
        $scope.levels = lvs;
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
    $scope.loadInsertedStudent = function(student) {
        $scope.toInserStudent = student;
    }

    /*
        $scope.students = students;

        $scope.tableParams = new NgTableParams({}, {
            dataset: $scope.students
        });

        $scope.levels = [];
        $scope.classes = ['Jasmin', 'Violette', 'Rose', 'Dahlia', 'Lilas', 'Lys', 'Narcisse'];

        LevelService.getAllLevels().then(function(lvs) {
            $scope.levels = lvs;
        });

        // StudentService.getAllStudents(function(sts) {
        //   $scope.students = sts;
        //   $scope.$apply();
        // });

        $scope.confirmDeletion = function(student) {
            $scope.toDeleteStudent = student;
        }

        $scope.upsert = function(student) {
            LevelService.getLevelById(student._levelId, function(level) {
                student.price = level.price;

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

                StudentService.upsertStudent(student, function(st) {
                    console.log('student added');
                });
            });

        };
        $scope.update = function(student) {

            StudentService.upsertStudent(student, function(st) {
                console.log('student prices edited');
            });

        };

        $scope.delete = function(student) {

            StudentService.removeStudent(student).then(function(nbrRM) {
                if (nbrRM == 1) {
                    StudentService.getAllStudents(function(lvs) {
                        $scope.students = lvs;
                        $scope.tableParams.reload();
                    });
                } else {
                    $scope.students.pop();
                    $scope.tableParams.reload();
                }
            });
        };

        $scope.deleteLastLine = function() {
            $scope.students.pop();
        };

        $scope.insertNewLine = function() {
            $scope.addedStudent = {
                firstname: '',
                lastname: '',
                _levelId: '',
                class: '',
                price: {}
            };

            $scope.students.push($scope.addedStudent);
        };

        $scope.loadPrices = function(student) {
            $scope.clickedStudent = student;
        };

    */
});
