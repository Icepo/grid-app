app.controller('quotaController',['$scope','$state','$rootScope','communicateService','paramsService',function($scope,$state,$rootScope,communicateService,paramsService){
    $scope.catalogs=($rootScope.cache.pages)[1].contentList;
    $scope.catalog_selected=0;
    //切换标签
    $scope.selectCatalog=function(index){
        $scope.catalog_selected=index;
        $scope.menuList=$scope.catalogs[index].menuList;
        //TODO 其它操作
    };
    $scope.menuList= $scope.catalogs[0].menuList;
    //选择单个指标
    $scope.quotaDetail=function(menu){
        console.log(menu.menuId);
        paramsService.quotaTitle=menu.menuName;
        communicateService.communicateTest('appService','action','quotaTotalData').success(function(data){
            paramsService.quotaTotalData = data;
            $state.go('quota_bak.chart.linechart');
        });
        //TODO 点击失败的处理
    }
}]);
app.controller('quotaTopController',['$scope','$state','$rootScope','constantService','paramsService',function($scope,$state,$rootScope,constantService,paramsService){
    $scope.quotaTitle=paramsService.quotaTitle;
    $scope.back=function(){
        history.back();
    };
    $scope.home=function(){
        $rootScope.title=constantService.HOME;
        $state.go('index.home.show');
    };
    $scope.navs=[constantService.COLUMN_CHART,constantService.LIST];
    $scope.selectNav=function(index){
        $scope.selectedNav=index;
        if(index==0){
            $state.go('quota_bak.chart.columnchart');
        }else {
            $state.go('quota_bak.chart.list');
        }
    };
    if($scope.selectedNav==undefined){
        $scope.selectedNav=0;
    }
}]);
app.controller('lineChartController',['$scope','$state','paramsService','communicateService',function($scope,$state,paramsService,communicateService){
    $scope.bottomTitle=paramsService.quotaTotalData.title;
    //要把state扔进去 让绘图函数改变路由
    $scope.eleOnload=function(){
        drawLineChart(paramsService.quotaTotalData,$state,communicateService,paramsService);
    };
}]);
app.controller('columnchartController',function($scope,$state,paramsService){
    $scope.eleOnload=function(){
        drawColumnChart(paramsService.quotaDataList,$state);
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