paymentModule.factory('PaymentService', function(DB_URL, $q) {



    return {


        getAllPayments: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.payments = new Datastore({
                filename: DB_URL + '/payments.db',
                autoload: true
            });

            db.payments.find({}, function(err, stds) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(stds);
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
        upsertPayment: function(payment) {
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
                db.payments.update({
                    _id: payment._id
                }, {
                    firstname: payment.firstname,
                    lastname: payment.lastname,
                    _levelId: payment._levelId,
                    class: payment.class,
                    price: payment.price,
                    products: payment.products
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.payments.persistence.compactDatafile();
                        defer.resolve(std);
                    }
                });

            }
                return defer.promise;
        }
    };

});
