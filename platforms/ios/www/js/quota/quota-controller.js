/*app.controller('quotaNavController',['$scope','$state','$rootScope','communicateService','constantService','paramsService',function($scope,$state,$rootScope,communicateService,constantService,paramsService) {
    $scope.tempIndex=1;
    for(var i=0;i<$scope.quotaNavList.length;i++) {
        var quotaId = $scope.quotaNavList[i].menuCode;
        var currentDate=new Date();
        var content = {
            "indexCode": quotaId,
            "areaId": $rootScope.cache.permissionAreaId,
            "areaType": $rootScope.cache.areaType,
//            "billingCycle":currentDate.getFullYear()+(currentDate.getMonth()<9?'0':'')+(currentDate.getMonth()+1)+(currentDate.getDate()<10?'0':'')+(currentDate.getDate())
            "billingCycle":"20150615"
        };
        communicateService.communicate('indexDataDateService', 'queryIndexDataList', content).success(function (data) {
            console.log(data);
            if (data && data.data) {
                var quotaName = data.quotaName;
                angular.element(document.getElementsByName(data.indexCode)).html(quotaName);
                $scope.tempIndex++;
            }
            if (data && data.indexCycle == 'D') {
                angular.element(document.getElementsByName(data.indexCode+'_img_d')).removeClass('ng-hide');
            }else if(data && data.indexCycle=='M'){
                angular.element(document.getElementsByName(data.indexCode+'_img_m')).removeClass('ng-hide');
            }
        });
    }
}]);*/
app.controller('rectNavController',['$scope','$state','$rootScope','communicateService','paramsService',function($scope,$state,$rootScope,communicateService,paramsService){
    $scope.tempIndex=1;
    if(!$rootScope.rectLoaded){
        $rootScope.rectLoaded=true;
        $rootScope.rectData=new Array();
        for(var i=0;i<$scope.rectNav.length;i++){
            var quotaId=$scope.rectNav[i].menuCode;
            var currentDate=new Date();
            var content={
                "indexCode":quotaId,
                "areaId":$rootScope.cache.permissionAreaId,
                "areaType":$rootScope.cache.areaType,
//            "billingCycle":currentDate.getFullYear()+(currentDate.getMonth()<9?'0':'')+(currentDate.getMonth()+1)+(currentDate.getDate()<10?'0':'')+(currentDate.getDate())
                "billingCycle":"20150615"
            };
            communicateService.communicate('indexDataDateService','queryIndexDataList',content).success(function(data){
                if(data && data.data){
                    var quotaName=data.quotaName;
                    if(quotaName && quotaName.length<6){
                        angular.element(document.getElementById('rect_menuName_'+$scope.tempIndex)).addClass('rect_inner_1_offset');
                        angular.element(document.getElementById('rect_mid_'+$scope.tempIndex)).addClass('rect_inner_2_offset');
                        angular.element(document.getElementById('rect_value_'+$scope.tempIndex)).addClass('rect_inner_3_offset');
                    }
                    angular.element(document.getElementById('rect_menuName_'+$scope.tempIndex)).html(quotaName);
                    angular.element(document.getElementById('rect_value_'+$scope.tempIndex)).html(data.data[data.data.length-1]);
                    $rootScope.rectData[$scope.tempIndex]=data;
                    $scope.tempIndex++;
                }
            });
        }
    }else{
        for(var i=0;i<$scope.rectNav.length;i++) {
            var data=$rootScope.rectData[$scope.tempIndex];
            if (data && data.data) {
                var quotaName = data.quotaName;
                if (quotaName && quotaName.length < 6) {
                    angular.element(document.getElementById('rect_menuName_' + $scope.tempIndex)).addClass('rect_inner_1_offset');
                    angular.element(document.getElementById('rect_mid_' + $scope.tempIndex)).addClass('rect_inner_2_offset');
                    angular.element(document.getElementById('rect_value_' + $scope.tempIndex)).addClass('rect_inner_3_offset');
                }
                angular.element(document.getElementById('rect_menuName_' + $scope.tempIndex)).html(quotaName);
                angular.element(document.getElementById('rect_value_' + $scope.tempIndex)).html(data.data[data.data.length - 1]);
                $scope.tempIndex++;
                $rootScope.rectDate = data;
            }
        }
    }
}]);

app.controller('quotaController',['$scope','$state','$rootScope','communicateService','paramsService','quotaService','constantService',function($scope,$state,$rootScope,communicateService,paramsService,quotaService,constantService){
    $scope.catalogs=($rootScope.cache.pages)[1].contentList;
    $scope.catalog_selected=0;
    //着色
    if($scope.catalogs){
        for(var i=0;i<$scope.catalogs.length;i++){
            var menuList=$scope.catalogs[i].menuList;
            if(menuList){
                for(var j=0;j<menuList.length;j++){
                    var index=j%8;
                    menuList[j].color=constantService.QUOTA_COLOR_ARRAY[index];
                }
            }
        }
    }
    //切换标签
    $scope.selectCatalog=function(index){
        $scope.catalog_selected=index;
        $scope.quotoList=paramsService.doArray($scope.catalogs[index].menuList,2);
        //TODO 其它操作
    };
    $scope.quotoList= paramsService.doArray($scope.catalogs[0].menuList,2);
    //选择单个指标
    $scope.quotaDetail=function(quotaId){
        quotaService.quotaDetail(quotaId);
    };
}]);
app.controller('quotaTopController',['$scope','$state','$rootScope','constantService','paramsService','communicateService','lineChartService','quotaService','columnChartService',function($scope,$state,$rootScope,constantService,paramsService,communicateService,lineChartService,quotaService,columnChartService){
    $scope.quotaTitle=paramsService.quotaTitle;
    $scope.back=function(){
        $rootScope.isFirstLineChart=false;
        history.back();
    };
    $scope.home=function(){
        $rootScope.title=constantService.HOME;
        $rootScope.isFirstLineChart=false;
        $state.go('index.home.show');
    };
    $scope.navs=[constantService.COLUMN_CHART,constantService.LIST];
    $scope.selectNav=function(index){
        $scope.selectedNav=index;
        if(index==0){
            $state.go('quota.chart.columnchart');
        }else {
            $state.go('quota.chart.list');
        }
    };
    if($scope.selectedNav==undefined){
        $scope.selectedNav=0;
    }
    var currentDate=paramsService.quotaTotalData.currentDate;
    showTitleDate(currentDate,paramsService.quotaTotalData.indexCycle);
    $scope.showDate=function(){
        var options = {
            date: new Date(),
            mode: 'date'
        };
        datePicker.show(options, function(date){
            if(date>new Date()){
            }else{
                var content={
                    "indexCode":paramsService.quotaTotalData.indexCode,
                    "areaId":$rootScope.cache.permissionAreaId,
                    "areaType":$rootScope.cache.areaType,
                    "billingCycle":date.getFullYear()+(date.getMonth()<9?'0':'')+(date.getMonth()+1)+(date.getDate()<10?'0':'')+(date.getDate())
                };
                communicateService.communicate('indexDataDateService','queryIndexDataList',content).success(function(data){
                    if(data.isSuccess==0){
                        console.log(data);
                        return;
                    }
                    paramsService.quotaTitle=data.quotaName;
                    paramsService.quotaTotalData.currentDate=new Date(date);
                    paramsService.quotaTotalData = data;
                    showTitleDate(date,paramsService.quotaTotalData.indexCycle);
                    lineChartService.drawLineChart(paramsService.quotaTotalData,$state,communicateService,paramsService,$rootScope);
                });
            }
        });
    };
    $scope.addTime=function(num){
        if(!paramsService.quotaTotalData.currentDate){
            paramsService.quotaTotalData.currentDate=new Date($rootScope.tempDate);
        }
        if(paramsService.quotaTotalData.currentDate<new Date()-1000*60*60*12 || num<0){
            $rootScope.tempDate=new Date(paramsService.quotaTotalData.currentDate);
            if(paramsService.quotaTotalData.indexCycle=='M'){
                $rootScope.tempDate.setMonth($rootScope.tempDate.getMonth()+num);
                showTitleDate($rootScope.tempDate,paramsService.quotaTotalData.indexCycle);
            }else if(paramsService.quotaTotalData.indexCycle=='D'){
                $rootScope.tempDate.setDate($rootScope.tempDate.getDate()+num);
                showTitleDate($rootScope.tempDate,paramsService.quotaTotalData.indexCycle);
            }
            console.log(paramsService.quotaTotalData.indexCode);
            if($state.current.name=='quota.chart.linechart'){
                var content={
                    "indexCode":paramsService.quotaTotalData.indexCode,
                    "areaId":$rootScope.cache.permissionAreaId,
                    "areaType":$rootScope.cache.areaType,
                    "billingCycle":$rootScope.tempDate.getFullYear()+($rootScope.tempDate.getMonth()<9?'0':'')+($rootScope.tempDate.getMonth()+1)+($rootScope.tempDate.getDate()<10?'0':'')+($rootScope.tempDate.getDate())
                };
                communicateService.communicate('indexDataDateService','queryIndexDataList',content).success(function(data){
                    if(data.isSuccess==0){
                        console.log(data);
                        return;
                    }
                    paramsService.quotaTitle=data.quotaName;
                    paramsService.quotaTotalData.currentDate=new Date($rootScope.tempDate);
                    paramsService.quotaTotalData = data;
                    lineChartService.drawLineChart(paramsService.quotaTotalData,$state,communicateService,paramsService,$rootScope);
                });
            }else if($state.current.name=='quota.chart.columnchart' || $state.current.name=='quota.chart.list'){
                var content={
                    "indexCode":paramsService.quotaTotalData.indexCode,
                    "areaId":paramsService.parentAreaId,
                    "areaCode":paramsService.parentAreaCode,
                    "billingCycle":currentDate.getFullYear()+(currentDate.getMonth()<9?'0':'')+(currentDate.getMonth()+1)+(currentDate.getDate()<10?'0':'')+(currentDate.getDate())
                };
                communicateService.communicate('indexDataDateService','queryXiazuanIndexDataList',content).success(function(data){
                    if(data.isSuccess==0){
                        console.log(data);
                        paramsService.quotaTotalData.currentDate=tempDate;
                        return;
                    }
                    paramsService.quotaTitle=data.quotaName;
                    data.currentDate=currentDate;
                    paramsService.quotaDataList = data;
                    if($state.current.name=='quota.chart.columnchart'){
                        columnChartService.drawColumnChart(data,$state);
                    }else{
                        $state.go('quota.chart.list');
                    }
                });
            }

        }
    };
    function showTitleDate(currentDate,indexCycle){
        if(indexCycle=='M'){
            $scope.quotaDate=currentDate.getFullYear()+'年'+(currentDate.getMonth()+1)+'月';
        }else if(indexCycle=='D'){
            $scope.quotaDate=currentDate.getFullYear()+'年'+(currentDate.getMonth()+1)+'月'+currentDate.getDate()+'日';
        }
    }
}]);
app.controller('lineChartController',['$scope','$state','paramsService','communicateService','lineChartService','$rootScope',function($scope,$state,paramsService,communicateService,lineChartService,$rootScope){
    $scope.bottomTitle=paramsService.quotaTotalData.title;
    //要把state扔进去 让绘图函数改变路由
    $scope.eleOnload=function(){
        lineChartService.drawLineChart(paramsService.quotaTotalData,$state,communicateService,paramsService,$rootScope);
    };
}]);
app.controller('columnchartController',function($scope,$state,paramsService,columnChartService){
    $scope.eleOnload=function(){
        columnChartService.drawColumnChart(paramsService.quotaDataList,$state);
    }
});
app.controller('listController',function($scope,paramsService,$state){
    //排序策略
    $scope.imgUrl={
        "value":"img/order_up.png",
        "last":"img/order_up.png",
        "sum":"img/order_up.png"
    };
    $scope.orderData=function(col){

    };
    $scope.data=paramsService.quotaDataList;
});