
var levelModule = angular.module('module.level', ['ngTable','xeditable','mgcrea.ngStrap','ngAnimate']);

levelModule.controller('LevelController', function($scope,$rootScope,LevelService) {

  $scope.levels  = [];

  LevelService.getAllLevels(function(lvs) {
    $scope.levels = lvs;
    $scope.$apply();
  });
$scope.confirmDeletion = function(level) {
  $scope.toDeleteLevel = level;
}

$scope.upsert = function(level){
  LevelService.upsertLevel(level,function(lv) {
    console.log('level saved/updated' + lv);
  });
};

$scope.delete = function (level) {
  LevelService.removeLevel(level,function(nbrRM) {
    if(nbrRM==1){
        LevelService.getAllLevels(function(lvs) {
          $scope.levels = lvs;
          $scope.$apply();
        });
    }
  });
};

$scope.deleteLastLine = function () {
 $scope.levels.pop();
};

$scope.insertNewLine = function() {
    $scope.addedLevel = {
      _id: '',
      price : {
          t1: {s:0,c:0,g:0,p:0,a:0},
          t2: {s:0,c:0,g:0,p:0,a:0},
          t3: {s:0,c:0,g:0,p:0,a:0}
        }
    };

   $scope.levels.push($scope.addedLevel);
};

$scope.loadPrices = function(level) {
  $scope.clickedLevel = level;
};

});
