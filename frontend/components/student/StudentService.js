studentModule.factory('StudentService', function(DB_URL) {
	var Datastore = require('nedb')
	, path = require('path');
	db = {};
	db.students = new Datastore({ filename:DB_URL+'/students.db',autoload: true });


			return  {

					getAllStudents : function(callback) {
											db.students.find({}, function (err, lvs) {
												if(err)
															console.log(err);
														else

															callback(lvs);


											});
					},

					removeStudent: function(student,callback) {

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

						db.students.update({_id: student._id}, {_id: student._id,price: student.price}, {upsert:true}, function(err,numReplaced,lv){
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
