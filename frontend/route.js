app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//do not use html5 mode!
$urlRouterProvider.otherwise('/login');
    $stateProvider
                .state('login', {
                                      url: '/login',
                                      templateUrl: 'frontend/common/login/views/login.html',
																			controller: 'LoginController'
                                })

                .state('level', {
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
                                           }
                                       }
                                })
                .state('student', {
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
                                           }
                                       }
                                })
                .state('user', {
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
                                                 }
                                              }
                                })
                .state('payment', {
                                      url: '/payment',
                                      templateUrl: 'frontend/components/payment/views/payment.html',
																			controller: 'PaymentController',
                                      resolve: {
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           }
                                       }

                                })


});
