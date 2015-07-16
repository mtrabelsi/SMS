
var paymentModule = angular.module('module.payment', []);

paymentModule.controller('PaymentController', function($scope,$filter,$modal, ngTableParams, StudentService,students) {

$scope.students = students;

             $scope.tableParams = new ngTableParams({
                         page: 1,            // params
                         count: 10
                     }, {
                         total: $scope.students.length, // length of data
                         counts: [10,13],

                         getData: function($defer, params) {
                             // use build-in angular filter
                             var orderedData = params.filter() ?
                                     $filter('filter')($scope.students, params.filter()) :
                                     $scope.students;

                            $scope.tmp = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                             params.total(orderedData.length); // set total for recalc pagination
                             $defer.resolve($scope.tmp);
                         }
                     });

var modalConfirm = $modal({scope: $scope,controller:'PaymentController' ,template: 'frontend/components/payment/views/payment.confirm.html', show: false});
var modalPayment = $modal({scope: $scope,controller:'PaymentController' ,template: 'frontend/components/payment/views/payment.create.html', show: false});

$scope.confirm = function(student) {
  $scope.toPayStudent = student;
  modalConfirm.$promise.then(modalConfirm.show);
}

/*
student.products =  {
    t1: {s:false,c:false,g:false,p:false,a:false},
    t2: {s:false,c:false,g:false,p:false,a:false},
    t3: {s:false,c:false,g:false,p:false,a:false}
  };*/

$scope.button = {
  checkbox: {
    t1: {s:true,c:false,g:false,p:false,a:false},
    t2: {s:false,c:false,g:false,p:false,a:false},
    t3: {s:false,c:false,g:false,p:false,a:true}
  }
};

$scope.payment = function() {
  // alert('payment '+$scope.toPayStudent.firstname);
  modalPayment.$promise.then(modalPayment.show);

}

});
