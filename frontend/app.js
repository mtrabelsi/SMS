var app =  angular.module('module.app',
										[
										'ngTable',
										'mgcrea.ngStrap',
										'ngAnimate',
										'ui.router',

										'module.login',
										'Const',
										'module.student',
										'module.toolbar',
										'module.level',
										'module.payment'
										]);

										//initialize toolbar just by injectin it
										//we've to change this later to manipulate it mannually(init, delete, refrash..)
										// app.run(function(Toolbar) {
										// });
