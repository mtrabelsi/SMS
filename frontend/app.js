var app =  angular.module('module.app',
										[
										'ngTable',
										'mgcrea.ngStrap',
										'ngAnimate',
										'ui.router',
										'ui.router.title',

										'module.login',
										'Const',
										'module.student',
										'module.toolbar',
										'module.level',
										'module.payment',
										'module.user'
										]);

app.factory('_', function() {
  return window._; //Underscore must already be loaded on the page
});

										//initialize toolbar just by injectin it
										//we've to change this later to manipulate it mannually(init, delete, refrash..)
										// app.run(function(Toolbar) {
										// });
