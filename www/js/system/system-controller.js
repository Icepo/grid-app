app.controller('loginController',['$scope','$state','$rootScope','communicateService','md5Service','constantService',function($scope,$state,$rootScope,communicateService,md5Service,constantService){
    if(localStorage.getItem('user')!=null){
        $scope.user=JSON.parse(localStorage.getItem('user'));
        $scope.user.userpassword='';
    }else{
        $scope.user={
            username:'',
            userpassword:'',
            userimei:'111',
            usermobile:'000000',
            userremember:false
        };
    }
    $scope.doLogin=function(){
        $scope.user.userpassword = md5Service.hex_md5($scope.user.userpassword);
        if($scope.user.userremember){
            localStorage.setItem("user",JSON.stringify($scope.user));
        }else{
            localStorage.removeItem("user");
        }
        communicateService.communicateTest('loginService','action',JSON.stringify($scope.user)).success(function(msg){
            if(msg.isSuccess=='1'){
                //TODO 登录成功
                $rootScope.title=constantService.HOME;
                $rootScope.cache=msg.data;
                $state.go('index.home.show');
            }else{
                //TODO 登录失败
//                $state.go('index.home_bak.show'); //FIXME 测试用
            }
        });
    }
}]);
app.controller('footerController',['$scope','$state','$rootScope','constantService',function($scope,$state,$rootScope,constantService){
    $scope.$watch(function(){
        console.log($state.current.name);
    });
    $scope.selectItem=function(text){
        for(var i= 0;i<$rootScope.footer_items.length;i++){
            var item=$rootScope.footer_items[i];
            if(item.footer_code==text){
                item.footer_selected=1;
                console.log('selected:'+text);
            }else{
                item.footer_selected=0;
            }
        }
        $rootScope.nav_selected=text;
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
    $rootScope.footer_items=[
        {
            "footer_icon":"img/footer_home.png",
            "footer_icon_active":"img/footer_home_active.png",
            "footer_code":"home",
            "footer_text":"首页",
            "footer_selected":1
        },
        {
            "footer_icon":"img/footer_quota.png",
            "footer_icon_active":"img/footer_quota_active.png",
            "footer_code":"quota",
            "footer_text":"指标",
            "footer_selected":0
        },
        {
            "footer_icon":"img/footer_report.png",
            "footer_icon_active":"img/footer_report_active.png",
            "footer_code":"report",
            "footer_text":"报表",
            "footer_selected":0
        },
        {
            "footer_icon":"img/footer_more.png",
            "footer_icon_active":"img/footer_more_active.png",
            "footer_code":"more",
            "footer_text":"更多",
            "footer_selected":0
        }
    ];

});

