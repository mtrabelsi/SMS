var historyModule = angular.module('module.history', []);

historyModule.controller('HistoryController', function(_, $q, $scope, levels, NgTableParams, PaymentService, payments) {
	$scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];

    $scope.payments = payments;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.payments
    });
});


historyModule.controller('HistoryPrinterController', function( $scope, NgTableParams, PaymentService, payment, levels) {

    $scope.payment = payment;
	$scope.tableChequeParams = new NgTableParams({}, {
        dataset: $scope.payment.amount.cheques
    });

     function calculateChequesAmount(){
        var chequeAmount = 0;

        $scope.payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }

    $scope.chequeAmount = calculateChequesAmount();

});
