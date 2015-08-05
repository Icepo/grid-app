/**
 * Created by liuzhangjun on 2015-5-25.
 */
app.controller('continuedController',function($scope,$state,communicateService,$rootScope,constantService,toaster){
    if($scope.invalidDate==undefined){
        $scope.invalidDate=new Date();
    }
    $scope.invalidDateStr=$scope.invalidDate.getFullYear()+($scope.invalidDate.getMonth()<9?'0':'')+($scope.invalidDate.getMonth()+1);
    //楼宇列表
    $scope.continuedWholesaleBuilding=function(areaId){
        var content={
//            "expMonth":$scope.invalidDateStr,
            "expMonth":"201407",
            "wangeId":areaId
        };
        communicateService.communicate('gridBundleInfoService','queryBundleBuildingInfo',content).success(function(data){
            console.log(data);
            $rootScope.buildingList=data.areaList;
            $rootScope.currentPermissioniId=content.wangeId;
            $state.go('continued.list.building');
        });
    };
    //用户列表
    $scope.getUserList=function(louyuId,isContinued){
        var content={
            "wangeId":"",
            "louyu":louyuId,
//            "expMonth":$scope.invalidDateStr,
            "expMonth":"",
            "isContinued":isContinued
        };
        communicateService.communicate('gridBundleInfoService','queryBundleUsersInfo',content).success(function(data){
            console.log(data);
            $rootScope.userList=data;
            $state.go('continued.list.user');
        });
    };
    $scope.showUserInfo=function($event,index){
        if($event.target.localName=='img'){
            return;
        }else{
            $scope.currentUserInfo=$scope.userList[index];
            $state.go('continued.list.userinfo');
        }
    };
    $scope.home=function(){
        $rootScope.title=constantService.HOME;
        $rootScope.isFirstLineChart=false;
        $state.go('index.home.show');
    };
    $scope.back=function(){
        history.back();
    };
    $scope.changeDate=function(value){
        var currentDate=new Date();
        var limitDate=new Date(currentDate.setMonth(currentDate.getMonth()+2));
        if($scope.invalidDate<limitDate && value>0 || value<0){
            $scope.invalidDate.setMonth($scope.invalidDate.getMonth()+value);
        }else{
            toaster.pop({
               title:"温馨提示",
                body:"续趸到期可选范围最大为三个月之后",
                type:"warning"
            });
        }
    }
    $scope.changeSts=function(sts){
        $scope.currentUserInfo.sts=sts;
    }
});