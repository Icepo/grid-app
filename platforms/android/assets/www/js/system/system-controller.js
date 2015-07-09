app.controller('loginController',['$scope','$state','$rootScope','communicateService','md5Service',function($scope,$state,$rootScope,communicateService,md5Service){
    $scope.user={
        username:'admin',
        userpassword:'admin',
        userimei:'111',
        usermobile:'13167374376',
        userremember:false
    };
    $scope.user.userpassword = md5Service.hex_md5($scope.user.userpassword);
    $scope.doLogin=function(){
        $rootScope.title='掌上营销';
        communicateService.communicateTest('loginService','action',JSON.stringify($scope.user)).success(function(msg){
            if(msg.isSuccess=='1'){
                //TODO 登录成功
                $rootScope.cache=msg.data;
                $state.go('index.home.show');
            }else{
                //TODO 登录失败
//                $state.go('index.home.show'); //FIXME 测试用
            }
        });
    }
}]);
app.controller('footerController',['$scope','$state','$rootScope','constantService',function($scope,$state,$rootScope,constantService){
    $scope.$watch(function(){
        console.log($state.current.name);
    });
    $scope.selectItem=function(text){
        var target='index.'+text+'.show';
        if(text=='home'){
            $rootScope.title=constantService.HOME;
        }else if(text=='report'){
            $rootScope.title=constantService.REPORT;
        }else if(text=='quota'){
            $rootScope.title=constantService.QUOTA;
        }
        $state.go(target);
    };
}]);
app.controller('homeController',function($scope,$rootScope){
    var contentList = ($rootScope.cache.pages)[0].contentList;
    $scope.radioNav=contentList[0].menuList;
    $scope.rectNav=contentList[1].menuList;
    $scope.quotaNav=contentList[2].menuList;
    $scope.reportNav=contentList[3];

});

