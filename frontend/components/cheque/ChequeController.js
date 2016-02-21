var chequeModule = angular.module('module.cheque', []);


chequeModule.controller('ChequeController', function(_, $q, $modal, $filter, $scope, NgTableParams, PaymentService, payments) {
    $scope.search = {
        dateEcheance: moment(new Date()).format("YYYY-MM-DD")
    }

    $scope.total = 0;

    function search() {
        var cheques = [];
        payments.forEach(function(payment) {
            payment.amount.cheques.forEach(function(cheque) {
                if (cheque.dateE == $scope.search.dateEcheance) {
                    $scope.total = $scope.total + cheque.amount;
                    cheques.push(cheque);
                }
            });
        });
    };

    $scope.$watch("search.dateEcheance", function() {
         $scope.tableParams.reload();
    }); 

    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: payments.length
    }, {
        getData: getData
    });

    function getData(params) {
       /* var filtredData = $filter('filter')($scope.payments, params.filter());
            filtredData = $filter('orderBy')(filtredData, params.orderBy());
        */
        var cheques = [];
        $scope.total= 0;
        payments.forEach(function(payment) {
            payment.amount.cheques.forEach(function(cheque) {
                if (cheque.dateE == $scope.search.dateEcheance) {
                    $scope.total = $scope.total + cheque.amount;
                    cheques.push(cheque);
                }
            });
        });

        return cheques;
    }


});
