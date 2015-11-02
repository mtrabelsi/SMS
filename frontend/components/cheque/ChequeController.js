var chequeModule = angular.module('module.cheque', []);


chequeModule.controller('ChequeController', function(_, $q, $modal, $filter, $scope, NgTableParams, PaymentService, payments) {

    $scope.cheques = [];

    var now = moment(new Date()).format("YYYY-MM-DD");
    $scope.total = 0;
    payments.forEach(function(payment){
        payment.amount.cheques.forEach(function(cheque){
           if(cheque.dateE==now){
              $scope.total =  $scope.total + cheque.amount;
              $scope.cheques.push(cheque);
           } 
        });
    }); 

    //Object {number: 6565, amount: 40, bank: "jjjj", dateE: "2015-10-25"}
    $scope.tableParams = new NgTableParams({
        count: $scope.cheques.length
    }, {
        dataset: $scope.cheques
    });

 
/*    function getData(params) {

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

*/

/*
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
      };*/

});

