app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//do not use html5 mode!
$urlRouterProvider.otherwise('/login');
    $stateProvider
                .state('login', {
                                      url: '/login',
                                      templateUrl: 'frontend/common/login/views/login.html',
																			controller: 'LoginController',
                                      resolve: {
                                        $title: function() { 
                                          return 'Connexion'; 
                                        }
                                      }
                                })
                $stateProvider
                    .state('manage', {
                        abstract: true,
                        templateUrl: 'manage.html',
                        url: '/manage'
                     })

                .state('manage.level', {
                                      url: '/level',
                                      templateUrl: 'frontend/components/level/views/level.html',
																			controller: 'LevelController',
                                      resolve: {
                                           levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvs) {
                                                   defer.resolve(lvs);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer Niveaux'; 
                                              }
                                       }
                                })
                .state('manage.student', {
                                      url: '/student',
                                      templateUrl: 'frontend/components/student/views/student.html',
                                      controller: 'StudentController',
                                      resolve: {
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Ajouter Etudiants'; 
                                              }
                                       }
                                })
                .state('manage.user', {
                                      url: '/user',
                                      templateUrl: 'frontend/common/user/views/user.html',
                											controller: 'UserController',
                                             resolve: {
                                               users: function (UserService, $q) {
                                                   var defer = $q.defer();
                                                  
                                                   UserService.getAllUsers().then(function(users) {
                                                       defer.resolve(users);
                                                   });
                                                  
                                                   return defer.promise;
                                                 },
                                               $title: function() { 
                                                return 'Gerer Utilisateurs'; 
                                                }
                                              }
                                })
                .state('manage.payment', {
                                      url: '/payment',
                                      templateUrl: 'frontend/components/payment/views/payment.html',
                                      controller: 'PaymentController',
                                      resolve: {
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer les Paiments'; 
                                              }
                                       }

                                })
                  .state('manage.history', {
                                      url: '/history',
                                      templateUrl: 'frontend/components/history/views/history.html',
                                      controller: 'HistoryController',
                                      resolve: {
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer les Historiques'; 
                                              }
                                       }

                                })

                      .state('manage.manageStudent', {
                                      url: '/manageStudent',
                                      templateUrl: 'frontend/components/student/views/student.manage.html',
                                      controller: 'StudentController',
                                      resolve: {
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Gerer Etudiants'; 
                                              }
                                       }

                                })

                  .state('printOne', {
                                      url: '/printone/:id',
                                      templateUrl: 'frontend/components/payment/views/payment.one.print.html',
																			controller: 'HistoryPrinterController',
                                      resolve: {
                                           payments: function (PaymentService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               PaymentService.getPaymentById($stateParams.id).then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Impression'; 
                                              }
                                       }

                                })



});
