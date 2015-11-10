var historyModule = angular.module('module.history', []);


historyModule.controller('HistoryController', function(_, $q, $rootScope, $modal, $filter, $scope, levels, NgTableParams, PaymentService, payments) {
	$scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];
    $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;
    
    $scope.printOneHistoryFire = function() {
     window.print();
     $rootScope.printOneHistory = false;
    };

    $scope.search = {
        dateDebutPayment: "",
        dateFinPayment : ""
    }

    $scope.payments = payments;


    function calculateChequesAmount(payment) {
        var chequeAmount = 0;

        payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }

    var modalShowDetail = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'HistoryController',
        template: 'frontend/components/history/views/history.detail.html',
        show: false
    });


    $scope.showDetail = function(payment) {
        $rootScope.printOneHistory = true;

        $scope.toShowPayment = payment;
        $scope.chequeAmount = calculateChequesAmount(payment);

        modalShowDetail.$promise.then(modalShowDetail.show);
    };


   function calculateTotal(pmts) {
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         var rtotale =0;
         var now = moment(new Date()).format("YYYY-MM-DD");

         pmts.forEach(function(payment) {
            if($scope.radios=="all") {
                totale = totale  + payment.amount.payedAmount;
            } else {
                payment.currentPayedProd.t1.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
                payment.currentPayedProd.t2.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
                payment.currentPayedProd.t3.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
            }

             //look for real amount only 
             rtotale = rtotale + payment.amount.brutAmount;

             payment.amount.cheques.forEach(function(cheque){
                if(cheque.dateE<=now){
                  rtotale = rtotale + cheque.amount;
                }
             });

         });

        $scope.rtotale = rtotale;
        $scope.totale = totale;
      };

   $scope.radios = "all";

    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: $scope.payments.length
    }, {
        getData: getData
    });

    function getData(params) {

       var   filtredData    = $filter('filter')($scope.payments, params.filter());
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());
       var filtredData2 = [];         
        if((typeof $scope.search.dateDebutPayment!= "undefined")&&$scope.search.dateDebutPayment && (typeof $scope.search.dateFinPayment!="undefined")&&$scope.search.dateFinPayment){
            
            filtredData.forEach(function(pay){

                if(pay.datePayment>=$scope.search.dateDebutPayment&&pay.datePayment<=$scope.search.dateFinPayment){
                    filtredData2.push(pay);
                }
            })
        }

        calculateTotal(filtredData2);
        
       return filtredData2;
    }

    $scope.filterTable =  function(){
            $scope.tableParams.reload();
    }

    $scope.$watch('radios', function() {
          $scope.filterTable();
    });

});


historyModule.controller('HistoryPrinterController', function( $scope, NgTableParams, PaymentService, payment, levels) {

    $scope.payment = payment;
    $scope.tableChequeParams = new NgTableParams({
        sorting: { name: "asc" } 
    }, {
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
