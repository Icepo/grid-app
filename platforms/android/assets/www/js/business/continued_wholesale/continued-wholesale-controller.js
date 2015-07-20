/**
 * Created by liuzhangjun on 2015-5-25.
 */
app.controller('continuedController',function($scope,$state,communicateService,$rootScope){
    if($scope.invalidDate==undefined){
        $scope.invalidDate=new Date();
    }
    $scope.invalidDateStr=$scope.invalidDate.getFullYear()+($scope.invalidDate.getMonth()<9?'0':'')+($scope.invalidDate.getMonth()+1);
    $scope.continuedWholesale=function(menu){
        var content={
            "expMonth":$scope.invalidDateStr,
            "staffId":$rootScope.cache.staffId
        };
        $scope.wanggeList=communicateService.communicate('gridBundleInfoService','queryPhysicalGridBundleInfo',content).success(function(data){
            console.log(data);
            $state.go(menu.menuUrl);
        });
    };
    $scope.showUser=function(){
        $state.go('continued.list.user');
    };
    $scope.showUserInfo=function(){
      $state.go('continued.list.userinfo')
    }
});