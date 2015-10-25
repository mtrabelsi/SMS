var paymentModule = angular.module('module.payment', []);

paymentModule.controller('PaymentController', function(_, PaymentService, $state ,$rootScope, $scope, NgTableParams, $filter, $modal, ngTableParams, levels, StudentService, students) {
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];
    $scope.levels = levels;
  
  window.sc = $scope;
    $scope.students = students;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });

    $scope.toAddCheque = {};

    
     $scope.undo = function(t,p) {
        $scope.toPayStudent.products[t][p] = false;
        $scope.newlyClickedProducts[t][p] = false;//this will be used for calculate amount
    }

 
//to be migrated to the frontend to compare performance !!!!!!
    var modalConfirmStart = $modal({
        scope: $scope,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.start.html',
        show: false
    });

    var modalConfirmProduct = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.product.html',
        show: false
    });

    var modalPayment1 = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step1.html',
        show: false
    });
    var modalPayment2 = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step2.html',
        show: false
    });

    $scope.confirmStart = function(student) {
        //init all variables
        resetScope();
        $scope.toPayStudent = student;
        modalConfirmStart.$promise.then(modalConfirmStart.show);
    }


    $scope.confirmProduct = function(t,p) {
         $scope.newlyClickedProducts[t][p] = true;//this will be used for calculate amount
         $scope.clickedProduct = {t:t,p:p};
         modalConfirmProduct.$promise.then(modalConfirmProduct.show);
    
    }

    $scope.paymentStep1 = function() {
        modalPayment1.$promise.then(modalPayment1.show);
    }

    $scope.paymentStep2 = function(student) {
        $scope.amount = $rootScope.calculateAmount($scope.newlyClickedProducts, student.price);
        modalPayment2.$promise.then(modalPayment2.show);
    }

    function calculateEntredAmount() {
        return  calculateChequesAmount() + $scope.payment.amount.brutAmount;
    }

    function calculateChequesAmount() {
        var chequeAmount = 0;

        $scope.payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }
    //init all variables
    resetScope();

    //only cheque amount
    $scope.chequeAmount = calculateChequesAmount;
    //cheques + brut amount
    $scope.entredAmount = calculateEntredAmount;

    $scope.tableChequeParams = new NgTableParams({}, {
        counts: [], //no pagination
        dataset: $scope.payment.amount.cheques
    });

    $scope.addCheque = function() {
        if($scope.toAddCheque.number>0&&$scope.toAddCheque.amount>0&& typeof $scope.toAddCheque.bank!="undefined"&& typeof $scope.toAddCheque.dateE!="undefined"){
            $scope.payment.amount.cheques.push($scope.toAddCheque);
            $scope.toAddCheque = {};
            $scope.tableChequeParams.reload();    
        }else{
            alert("Vérifiez vos données de cheque!");
        }
    }

    $scope.removeCheque = function(cheque) {
        indexToBeDeleted = _.indexOf(_.pluck($scope.payment.amount.cheques, 'number'), cheque.number);
        $scope.payment.amount.cheques.splice(indexToBeDeleted, 1);
        $scope.tableChequeParams.reload();
    }

    $rootScope.calculateAmount = function(products, price) {
        var amount = 0;
        Object.keys(price).forEach(function(t) {
            Object.keys(price[t]).forEach(function(p) {
                if (products[t][p] == true) {
                    amount = amount + price[t][p];
                    $scope.payment.currentPayedProd[t].push({product: p, price: price[t][p]});
                }
            });
        });

        return amount;
    }

    function resetScope() {

          $scope.newlyClickedProducts = {
            t1: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t2: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t3: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            }
        };

       $scope.payment = {
                amount: {
                    payedAmount :0,
                    brutAmount: 0,
                    cheques: []
                },
                currentPayedProd: {
                    t1: [],
                    t2: [],
                    t3: []
                },
                datePayment : new Date(),
                modePay: '',
                firstname: '',
                lastname: '',
                _levelId : '',
                class : ''

            };
    }

    function getModepay() {
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length==0){
            return "Espece";
        }
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length!=0){
            return "Espece/Cheques";
        }
        if($scope.payment.amount.brutAmount==0 && $scope.payment.amount.cheques.length!=0){
            return "Cheques";
        }
        return "ModePay inconnu!";
    }


    //final payment
    $scope.finalPayment = function(student) {


        $scope.payment.datePayment = moment($scope.payment.datePayment).format("YYYY-MM-DD");


        $scope.payment.modePay = getModepay();
        $scope.payment.amount.payedAmount = $scope.amount;
        $scope.payment.firstname = student.firstname;
        $scope.payment.lastname = student.lastname;
        $scope.payment._levelId = student._levelId;
        $scope.payment.class = student.class;

        var idTobePrinted = null;
        PaymentService.insertPayment($scope.payment).then(function(pmt) {
            //usr is undefined even it is succesfully updated..
            idTobePrinted = pmt._id; 
            return StudentService.upsertStudent(student);//next to other operation
        }, function(error) {
            alert('Impossible de procéder le paiment, detail : ' + error);
        }).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            alert('operation terminé avec succès ');
            $state.go('printOne',{id: idTobePrinted});//go for printing!

        }, function(error) {
            alert("Impossible de mettre à jours l'eleve, detail : " + error);
        });

        resetScope();
    };

});
