paymentModule.factory('PaymentService', function(DB_URL) {



			return  {


					getAllStudents : function(callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.students = new Datastore({ filename:DB_URL+'/students.db',autoload: true });

											db.students.find({}, function (err, stds) {
												if(err)
															console.log(err);
														else

															callback(stds);

											});
					},

					removeStudent: function(student,callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.students = new Datastore({ filename:DB_URL+'/students.db',autoload: true });

						db.students.remove({ _id: student._id }, {}, function (err, numRemoved) {
							if(err)
									console.log(err);
								else
									{
									db.students.persistence.compactDatafile();
									callback(numRemoved);
								}
						});

					},
					upsertStudent: function(student,callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.students = new Datastore({ filename:DB_URL+'/students.db',autoload: true });

						db.students.update({_id: student._id}, {
									firstname: student.firstname,
									lastname: student.lastname,
									_levelId: student._levelId,
									class: student.class,
									price: student.price
						},{upsert:true}, function(err,numReplaced,lv) {
							if(err)
									console.log(err);
								else
									{
									db.students.persistence.compactDatafile();
									callback(lv);
								}
						});
			}
		};

});
