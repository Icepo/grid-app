app.controller('loginController',['$scope','$state','$rootScope','communicateService','md5Service','constantService','toaster',function($scope,$state,$rootScope,communicateService,md5Service,constantService,toaster){
    if(localStorage.getItem('user')!=null){
        $scope.user=JSON.parse(localStorage.getItem('user'));
        $scope.user.userpassword='';
    }else{
        $scope.user={
            username:'',
            userpassword:'',
            userimei:'1111',
            usermobile:'13167374376',
            userremember:false
        };
    }
    $scope.doLogin=function(){
        var contentUser={
            username:$scope.user.username,
            userpassword:md5Service.hex_md5($scope.user.userpassword),
            userimei:$scope.user.userimei,
            usermobile:$scope.user.usermobile
        };
        if($scope.user.userremember){
            localStorage.setItem("user",JSON.stringify($scope.user));
        }else{
            localStorage.removeItem("user");
        }
        communicateService.communicate('loginService','login',contentUser).success(function(msg){
            if(msg.isSuccess=='1'){
                //TODO 登录成功
                $rootScope.title=constantService.HOME;
                $rootScope.cache=msg.data;
                console.log($rootScope.cache);
                $state.go('index.home.show');
            }else{
                //TODO 登录失败
                console.log(msg);
                toaster.pop({type:"error",title:"登录失败",body:"登录信息错误"});
//                $state.go('index.home_bak.show'); //FIXME 测试用
            }
        });
    }
}]);
app.controller('footerController',['$scope','$state','$rootScope','constantService','communicateService',function($scope,$state,$rootScope,constantService,communicateService){
    $scope.selectItem=function(text){
        for(var i= 0;i<$rootScope.footer_items.length;i++){
            var item=$rootScope.footer_items[i];
            if(item.footer_code==text){
                $rootScope.nav_selected=text;
                item.footer_selected=1;
                console.log('selected:'+text);
            }else{
                item.footer_selected=0;
            }
        }
        var target='index.'+text+'.show';
        if(text=='home'){
            $rootScope.title=constantService.HOME;
        }else if(text=='report'){
            $rootScope.title=constantService.REPORT;
        }else if(text=='quota'){
            $rootScope.title=constantService.QUOTA;
        }else if(text=='more'){
            target=text;
        }
        $state.go(target);
    };
    if(!$rootScope.nav_selected){
        $rootScope.footer_items=[
            {
                "footer_icon":"img/footer_home.png",
                "footer_icon_active":"img/footer_home_active.png",
                "footer_code":"home",
                "footer_text":"首页",
                "footer_selected":0
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
        $rootScope.nav_selected='home';
        $scope.selectItem('home');
    }
}]);
app.controller('homeController',function($scope,$rootScope,communicateService,constantService,paramsService){
    var contentList = ($rootScope.cache.pages)[0].contentList;
    $scope.radioNav=contentList[0].menuList;
    var rectNavList=contentList[1].menuList;
    $scope.rectNav=rectNavList;
    $scope.quotaNavList=contentList[2].menuList;
    $scope.quotaNavListCopy=$scope.quotaNavList.slice(0);
    $scope.quotaNav=paramsService.doArray($scope.quotaNavListCopy,2);
    $scope.reportNav=contentList[3];
    //处理菜单列表中的指标id补充上指标数值
    /*function getQuotaData(quotaList){
        for(var i=0;i<quotaList.length;i++){
            var quotaId=quotaList[i].menuName;
            //FIXME 测试用数据
            var billingCycle="20140715";
            if(quotaId=='KPI442'){
                billingCycle="201407";
            }
            var content={
                "indexCode":quotaId,
                "areaId":$rootScope.cache.permissionAreaId,
                "areaType":$rootScope.cache.areaType,
//                "billingCycle":new Date().getFullYear()+(new Date().getMonth()<9?'0':'')+(new Date().getMonth()+1)
                "billingCycle":billingCycle //FIXME
            };
            var quotaData;
            communicateService.communicate('indexDataDateService','queryIndexDataList',JSON.stringify(content)).success(function(msg){
                if(msg.isSuccess==1){
                    quotaData=msg.data;
                }else{
                    //TODO 查询指标失败
                }
            }).error(function(){
                //TODO 通信失败
                console.log('communicateError');
            });
            if(!$rootScope.quotaCache){
                function HashMap(){
                    this.map = {};
                }
                HashMap.prototype = {
                    put : function(key , value){
                        this.map[key] = value;
                    },
                    get : function(key){
                        if(this.map.hasOwnProperty(key)){
                            return this.map[key];
                        }
                        return null;
                    },
                    remove : function(key){
                        if(this.map.hasOwnProperty(key)){
                            return delete this.map[key];
                        }
                        return false;
                    }
                };
                HashMap.prototype.constructor = HashMap;
                $rootScope.quotaCache=new HashMap();
            }
            //正常情况展示最新值，数据异常的展示0
            if(quotaData&&quotaData.data&&quotaData.data[quotaData.data.length-1]){
                //提前获取到主页四个指标的数值并加入内存
                $rootScope.quotaCache.put(quotaId,quotaData);
                quotaList[i].menuName=quotaDate.quotaName;
                quotaList[i].quotaValue=quotaData.data[quotaData.data.length-1];
                quotaList[i].imgUrl=quotaData.data.indexCycle=='D'?constantService.QUOTA_D_IMG:constantService.QUOTA_M_IMG;
                quotaList[i].menuId=quotaId;
            }else{
                quotaList[i].quotaValue=constantService.QUOTA_DEFAULT_VALUE;
                quotaList[i].menuName=constantService.QUOTA_DEFAULT_NAME;
            }
        }
        return quotaList;
    }*/
});
app.controller('radioNavController',function($scope,$rootScope,$state,communicateService,toaster){
    //选择菜单
    $scope.selectMenu=function(menu){
        if(menu.menuCode=='xudun'){
            var content={
//            "expMonth":$scope.invalidDateStr,
                "expMonth":"201410",
                "staffId":$rootScope.cache.staffId
            };
            communicateService.communicate('gridBundleInfoService','queryPhysicalGridBundleInfo',content).success(function(data){
                console.log(data);
                $rootScope.wanggeList=data.dataList;
                //留存当前查询状态
                $rootScope.currentPermissioniId=content.staffId;
                $state.go(menu.menuUrl);
            });
        }else if(menu.menuCode=='yonghukapian'){
            var content={
                "dgridId":$rootScope.cache.permissionAreaId
            }
            communicateService.communicate('btUserInfoDayService','queryBtUserInfoDayList',content).success(function(data){
                if(data && data.return_code==1){
                    toaster.pop({type:"error",title:"查询失败",body:data.return_msg});
                    return;
                }else{
                    $rootScope.userInfoList=data;
                    $rootScope.userInfoListBackUp=data.concat();
                    console.log(data);
                    $state.go(menu.menuUrl);
                }
            })
        }else if(menu.menuCode=='huodong'){
            $state.go(menu.menuUrl);
        }
    };
});

