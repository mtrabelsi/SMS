levelModule.factory('LevelService', function(DB_URL) {
	var Datastore = require('nedb')
	, path = require('path');
	db = {};
	db.levels = new Datastore({ filename:DB_URL+'/levels.db',autoload: true });


			return  {

					getAllLevels : function(callback) {
											db.levels.find({}, function (err, lvs) {
												if(err)
															console.log(err);
														else

															callback(lvs);


											});
					},

					removeLevel: function(level,callback) {

						db.levels.remove({ _id: level._id }, {}, function (err, numRemoved) {
							if(err)
									console.log(err);
								else
									{
									db.levels.persistence.compactDatafile();
									callback(numRemoved);
								}
						});

					},
					upsertLevel: function(level,callback) {

						db.levels.update({_id: level._id}, {_id: level._id,price: level.price}, {upsert:true}, function(err,numReplaced,lv){
							if(err)
									console.log(err);
								else
									{
									db.levels.persistence.compactDatafile();
									callback(lv);
								}
						});


			}
		};

});
