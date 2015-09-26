studentModule.factory('StudentService', function(DB_URL, $q) {



    return {


        getAllStudents: function() {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            db.students.find({}, function(err, stds) {
                if (err) {
                    console.log(err);
                    defer.reject('Error in the query, err = ' + err);
                } else {
                    defer.resolve(stds);
                }


            });
            return defer.promise;

        },

        removeStudent: function(student) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            if (typeof student === "undefined") {
                defer.reject("Are trying to delete an empty student?");
            } else {
                db.students.remove({
                    _id: student._id
                }, {}, function(err, numRemoved) {
                    if (err) {
                        console.log(err);
                        defer.reject('Error in the query, err = ' + err);
                    } else {
                        db.students.persistence.compactDatafile();
                        defer.resolve(numRemoved);
                    }
                });
            }
            return defer.promise;

        },
        upsertStudent: function(student) {
            var defer = $q.defer();

            var Datastore = require('nedb'),
                path = require('path');
            db = {};
            db.students = new Datastore({
                filename: DB_URL + '/students.db',
                autoload: true
            });

            if (typeof student === "undefined") {
                defer.reject("Are trying to insert an empty student?");
            } else {
                db.students.update({
                    _id: student._id
                }, {
                    firstname: student.firstname,
                    lastname: student.lastname,
                    _levelId: student._levelId,
                    class: student.class,
                    price: student.price,
                    products: student.products
                }, {
                    upsert: true
                }, function(err, numReplaced, std) {
                    if (err){
                        console.log(err);
                        defer.reject('Error in the query, err = '+err);
                    }
                    else {
                        db.students.persistence.compactDatafile();
                        defer.resolve(std);
                    }
                });

            }
                return defer.promise;
        }
    };

});
