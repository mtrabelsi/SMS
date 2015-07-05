app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//do not use html5 mode!
$urlRouterProvider.otherwise('/login');
    $stateProvider
                .state('login', {
                                      url: '/login',
                                      templateUrl: 'frontend/common/login/views/login.html',
																			controller: 'LoginController'
                                })
                .state('student', {
                                      url: '/student',
                                      templateUrl: 'frontend/components/student/views/student.html',
																			controller: 'StudentController'
                                })


});
