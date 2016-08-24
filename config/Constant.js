var cst = angular.module('Const',[]);

var path = require("path");

var current = process.execPath;
var dbUrl = path.join(current, '..','mydb');

cst.constant('DB_URL', dbUrl);
