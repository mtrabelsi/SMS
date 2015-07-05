loginModule.factory('Auth', function(DB_URL) {

			return  {

					getUser	:function(data,callback) {

								var Datastore = require('nedb')
							  , path = require('path');

								db = {};
								db.users = new Datastore({ filename:DB_URL+'/users.db',autoload: true });


								db.users.findOne({ username: data.username, password: data.password}, function (err, user) {
									if(err)
												console.log(err);
											else
											callback(user);
								});

					}
		   };

});
