levelModule.factory('LevelService', function(DB_URL) {
			return  {

					getAllLevels : function(callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.levels = new Datastore({ filename:DB_URL+'/levels.db',autoload: true });

											db.levels.find({}, function (err, lvs) {
												if(err)
															console.log(err);
														else

															callback(lvs);


											});
					},
					getLevelById : function(id,callback) {

						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.levels = new Datastore({ filename:DB_URL+'/levels.db',autoload: true });

											db.levels.findOne({_id:id}, function (err, lv) {
												if(err)
															console.log(err);
														else
															{
																		callback(lv);
															}
											});
					},

					removeLevel: function(level,callback) {
						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.levels = new Datastore({ filename:DB_URL+'/levels.db',autoload: true });

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
						var Datastore = require('nedb')
						, path = require('path');
						db = {};
						db.levels = new Datastore({ filename:DB_URL+'/levels.db',autoload: true });

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
