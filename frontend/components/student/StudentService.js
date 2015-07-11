studentModule.factory('StudentService', function(DB_URL) {
	var Datastore = require('nedb')
	, path = require('path');
	db = {};
	db.students = new Datastore({ filename:DB_URL+'/students.db',autoload: true });


			return  {

					getAllStudents : function(callback) {
										db.students.find({}, function (err, sdts) {
											if(err)
														console.log(err);
													else
													callback(sdts);
										});
					},
					saveStudent: function(){

					}
		   };

});
