paymentModule.factory('PaymentService', function(DB_URL, $q) {



    return {


        getPaymentById: function(id) {
            var defer = $q.defer();
            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            db.payments.findOne({_id:id}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(pmts);
                }


            });
            return defer.promise;

        },

        getAllPayments: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            db.payments.find({}, function(err, pmts) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(pmts);
                }


            });
            return defer.promise;

        },

        removePayment: function(payment) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            if (typeof payment === "undefined") {
                defer.reject("Are trying to delete an empty payment?");
            } else {
                db.payments.remove({
                    _id: payment._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        },
        insertPayment: function(payment) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            if (typeof payment === "undefined") {
                defer.reject("Are trying to insert an empty payment?");
            } else {
                db.payments.insert(payment, /*{
                    firstname: payment.firstname,
                    lastname: payment.lastname,
                    _levelId: payment._levelId,
                    class: payment.class,
                    price: payment.price,
                    products: payment.products
                }*/ function(err, newPayment) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(newPayment);
                    }
                });

            }
                return defer.promise;
        }
    };

});
