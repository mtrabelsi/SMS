var app =  angular.module('module.app',
										[
										'module.login',
										'ui.router',
										'Const',
										'module.student',
										'module.toolbar'
										]);

										//initialize toolbar just by injectin it
										//we've to change this later to manipulate it mannually(init, delete, refrash..)
										app.run(function(Toolbar) {
										});
