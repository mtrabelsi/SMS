var historyModule = angular.module('module.history', []);

historyModule.controller('HistoryController', function(_, $q, $scope, NgTableParams, PaymentService, payments) {

    $scope.payments = payments;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.payments
    });

});
/*
historyModule.controller('HistoryPrinterController', function( $scope, NgTableParams, PaymentService, payments) {

    $scope.payments = payments;


});
*/