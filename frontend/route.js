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
																			controller: 'LevelController'
                                })
                .state('student', {
                                      url: '/student',
                                      templateUrl: 'frontend/components/student/views/student.html',
                											controller: 'StudentController'
                                })
                .state('payment', {
                                      url: '/payment',
                                      templateUrl: 'frontend/components/payment/views/payment.html',
																			controller: 'PaymentController',
                                      resolve: {
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                               //defer.promise.then(function () {
                                               StudentService.getAllStudents(function (sts) {
                                                   //alert(JSON.stringify(sts));
                                                   //return sts;
                                                   defer.resolve(sts);
                                               });
                                               //})
                                               //defer.resolve();
                                               return defer.promise
                                           }
                                       }

                                })


});
