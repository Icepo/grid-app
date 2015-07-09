/**
 * Created by liuzhangjun on 2015-5-25.
 */
app.controller('continuedController',function($scope,$state){
    $scope.showUser=function(){
        $state.go('continued.list.user');
    };
    $scope.showUserInfo=function(){
      $state.go('continued.list.userinfo')
    }
});