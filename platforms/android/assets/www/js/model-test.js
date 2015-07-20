/**
 * Created by liuzhangjun on 2015/5/15.
 */
var app=angular.module('app',[]);
app.controller('loginController',function($scope){
    $scope.user={'username':'admin','password':'123456'};
});
