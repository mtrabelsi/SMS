var historyModule = angular.module('module.history', []);


historyModule.controller('HistoryController', function(_, $q, $filter, $scope, levels, NgTableParams, PaymentService, payments) {
	$scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];

$scope.search = {
    dateDebutPayment: "",
    dateFinPayment : ""
}

    $scope.payments = payments;

   function calculateTotal(pmts) {
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         pmts.forEach(function(payment) {
             totale = totale  + payment.amount.payedAmount;
         });

        $scope.totale = totale;
      };

  //  $scope.calculateTotal = calculateTotal;  

  //  $scope.calculateTotal($scope.payments);
// {"amount":{"payedAmount":49,"brutAmount":29,"cheques":[{"number":"12","amount":10,"bank":"zitouna","dateE":{"$$date":1444604400000}},{"number":"13","amount":10,"bank":"zitouna","dateE":{"$$date":1445986800000}}]},"currentPayedProd":{"t1":[{"product":"c","price":4}],"t2":[{"product":"c","price":45}],"t3":[]},"datePayment":{"$$date":1444598990043},"modePay":"Espece/Cheques","firstname":"marwn1","lastname":"marwn1","_levelId":"Niveau 2","class":"Jasmin","_id":"ujtZCXEOVu8dHxUo"}
    // function calculateTotaleCheque(cheques) {
    //     var totaleCheques = 0;
    //     cheques.forEach(function(cheque){
    //         totaleCheques = totaleCheques + cheque.amount;
    //     });
    //     return totaleCheques;
    // }

    /*
  $scope.tableParams = new ngTableParams({
+                page: 1,   // show first page
+                total: 1,  // value less than count hide pagination
+                count: 5,  // count per page
+                counts: [] // hide page counts control
+            });
+            
+            $scope.$watch('tableParams', function(params) {
+
+                $scope.users = data.slice((params.page - 1) * params.count, params.page * params.count);
+            }, true);
    */

    $scope.tableParams = new NgTableParams({
        count: $scope.payments.length
    }, {
        getData: getData
    });

    function getData(params) {

       var   filtredData    = $filter('filter')($scope.payments, params.filter());
       var filtredData2 = [];         
        if((typeof $scope.search.dateDebutPayment!= "undefined")&&$scope.search.dateDebutPayment && (typeof $scope.search.dateFinPayment!="undefined")&&$scope.search.dateFinPayment){
            console.log($scope.search);
            
            filtredData.forEach(function(pay){

                console.log('---------');
                console.log(pay.datePayment);

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
   // $scope.$watch('tableParams', function(params) {

   //              $scope.users = data.slice((params.page - 1) * params.count, params.page * params.count);
   //          }, true);


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
