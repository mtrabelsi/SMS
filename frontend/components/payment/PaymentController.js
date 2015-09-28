var paymentModule = angular.module('module.payment', []);

paymentModule.controller('PaymentController', function(_,$rootScope, $scope, NgTableParams, $filter, $modal, ngTableParams, StudentService, students) {


    $scope.students = students;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });

    $scope.toAddCheque = {};

    var modalConfirm = $modal({
        scope: $scope,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.html',
        show: false
    });
    var modalPayment1 = $modal({
        scope: $scope,
        backdrop : 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step1.html',
        show: false
    });
    var modalPayment2 = $modal({
        scope: $scope,
        backdrop : 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step2.html',
        show: false
    });

    $scope.confirm = function(student) {
        $scope.toPayStudent = student;
        modalConfirm.$promise.then(modalConfirm.show);
    }


    $scope.paymentStep1 = function() {
        modalPayment1.$promise.then(modalPayment1.show);
    }
    
    $scope.paymentStep2 = function(student) {
        //to be changed with normale users we get prices from levels 
        //with admin loggedin we took this from the user's price object
        $scope.amount = $rootScope.calculateAmount(student.products,student.price);
        modalPayment2.$promise.then(modalPayment2.show);
    }
    
    function calculateEntredAmount() {
      var entredAmount = 0;
      entredAmount = entredAmount + $scope.payment.amount.brutAmount;
    
      $scope.payment.amount.cheques.forEach(function(cheque){
        entredAmount = entredAmount + cheque.amount;
      });
      return entredAmount;
    }

    $scope.payment = {
      amount : {
        brutAmount: 0,
        cheques : []
      }

    };

    $scope.entredAmount = calculateEntredAmount;


    $scope.tableChequeParams = new NgTableParams({}, {
      counts: [],//no pagination
      dataset: $scope.payment.amount.cheques
    });

    $scope.addCheque = function() {
      $scope.payment.amount.cheques.push($scope.toAddCheque);
      $scope.toAddCheque = {};
      $scope.tableChequeParams.reload();
    }

    $scope.removeCheque = function(cheque) {
      indexToBeDeleted = _.indexOf(_.pluck($scope.payment.amount.cheques, 'number'), cheque.number);
      $scope.payment.amount.cheques.splice(indexToBeDeleted,1);    
      $scope.tableChequeParams.reload();
    }

    $rootScope.calculateAmount =  function (products,price) {
      var amount = 0;
       Object.keys(price).forEach(function(t) {
          Object.keys(price[t]).forEach(function(p) {
              if(products[t][p]==true) {
                amount = amount + price[t][p];
              }
          });
       });

       return amount;
    }

    //final payment
    $scope.finalPayment = function(student) {
      // alert('done ! '+$scope.amount);
      calculateEntredAmount();
    };

});
