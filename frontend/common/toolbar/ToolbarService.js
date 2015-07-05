var toolbarModule = angular.module('module.toolbar', []);

toolbarModule.factory('Toolbar', function() {

  var gui = require('nw.gui');
  var win = gui.Window.get();
  var menu = new gui.Menu();

  menu.append(new gui.MenuItem({ label: 'Item A' }));
  menu.append(new gui.MenuItem({ label: 'Item B' }));
  menu.append(new gui.MenuItem({ type: 'separator' }));
  menu.append(new gui.MenuItem({ label: 'Item C' }));

  var menubar = new gui.Menu({ type: 'menubar' });

   menubar.append(new gui.MenuItem({ label: 'File', submenu: menu}));
   win.menu = menubar;
   
return {
      gui: function(){
        return gui;
      }
  }

});
/*

toolbarModule.controller('LoginController', function($scope,$rootScope,$state) {
  var gui = require('nw.gui');
  var win = gui.Window.get();

// Create an empty menu
var menu = new gui.Menu();

// Add some items
menu.append(new gui.MenuItem({ label: 'Item A' }));
menu.append(new gui.MenuItem({ label: 'Item B' }));
menu.append(new gui.MenuItem({ type: 'separator' }));
menu.append(new gui.MenuItem({ label: 'Item C' }));

var menubar = new gui.Menu({ type: 'menubar' });
 menubar.append(new gui.MenuItem({ label: 'File', submenu: menu}));
 win.menu = menubar;


$rootScope.user = {
  loggedin: false,
  object: {}
};

$scope.form = {
  username : 'admin',
  password: '0000'
};

$scope.logIn = function() {

    Auth.getUser($scope.form, function(user){
        if(user!=null){
          $rootScope.user.loggedin = true;
          $rootScope.user.object = user;
          $state.go('student');
        }
    });
};

});
*/
