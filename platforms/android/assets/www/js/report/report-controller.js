/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.controller('reportController',function($scope,$state,$rootScope,communicateService,paramsService,reportService) {
    $scope.reportContentList = ($rootScope.cache.pages)[2].contentList;
    //选择单个报表
    $scope.reportDetail = function (menu) {
//        device.setHorizontal(function(){},function(){});
        document.addEventListener('backbutton',onBackButton,false);
        function onBackButton(){
//            device.setVertical(function(){},function(){});
            document.removeEventListener('backbutton',onBackButton,false);
        }
        $rootScope.reportTitle=menu.menuName;
        //TODO 查询报表条件
        console.log(menu);
        paramsService.targetService=menu.menuCode.split('.')[0];
        paramsService.targetMethod=menu.menuCode.split('.')[1];
        paramsService.reportType=menu.menuDesc;
        $state.go(menu.menuUrl);
    };
    $scope.back = function () {
        if($state.current.name=='report.detail.list'){
//            device.setVertical(function(){},function(){});
            history.back();
        }
        history.back();
    };
    $scope.queryReport=function(){
        var content={
//            "acctDate":paramsService.currentDateStr,
            "acctDate":"20141201",
            "areaId":paramsService.currentSelectAreaId
        };
        console.log(content);
        communicateService.communicate(paramsService.targetService,paramsService.targetMethod,content).success(function(data){

            if(data && data.isSuccess==0){
                return;
            }else{
                $rootScope.reportItems=data;
                console.log($rootScope.reportItems);
            }
        })

    }
});
app.controller('reportListController',function($scope,$rootScope,paramsService,communicateService){
    $rootScope.optionShow = false;
    $scope.currentAreaId=$rootScope.cache.permissionAreaId;
    paramsService.currentSelectAreaId=$scope.currentAreaId;
    $rootScope.currentAreaName=$rootScope.cache.permissionAreaName;
    $scope.currentDate=new Date();
    $scope.currentDateStr=$scope.currentDate.getFullYear()+''+($scope.currentDate.getMonth()<10?'0':'')+($scope.currentDate.getMonth()+1)+(paramsService.reportType=='M'?'':$scope.currentDate.getDate());
    paramsService.currentDateStr=$scope.currentDateStr;
    console.log($scope.currentDateStr);
    $scope.changeDisplay = function () {
        $rootScope.optionShow = !($rootScope.optionShow);
    };
    //展示选项卡
    $scope.changeDisplay = function (areaId,optionCol,root) {
        var content={
            "permissionAreaId":areaId
        };
        //FIXME 本地
//        communicateService.communicateLocal('areaType_30.json').success(function(data){
        communicateService.communicate('appUserAreaListService','doGetUserAreaList',content).success(function(data){
            if(data.isSuccess==0){
                return;
            }else{
                var areaList=data.areaList;
                var reportOptionCol_1=angular.element("#"+optionCol);
                if(areaList.length>0){
                    for(var i=0;i<areaList.length;i++){
                        var liStr="<li id="+areaList[i].areaId+">"+areaList[i].areaName+"</li>";
                        reportOptionCol_1.append(liStr);
                    }
                }
            }
        });
        if(root){
            $rootScope.optionShow = !($rootScope.optionShow);
        }
    };
    $scope.optionSelected_1 = '';
    $scope.changeOption = function ($event) {
        angular.element('#rootLi').removeClass('option_active');
        var obj = $event.target;
        $scope.currentSelectAreaId=obj.id;
        paramsService.currentSelectAreaId;
        $rootScope.currentAreaName=obj.innerHTML;
        console.log($scope.currentSelectAreaId);
        var parent=obj.parentElement;
        var lis=angular.element('#'+parent.id+' li');
        lis.removeClass('option_active');
        angular.element('#'+obj.id).addClass('option_active');
        if(parent.classList.contains('has-next') && obj.id!=='rootLi'){
            var nextLid=parent.id+'_nextAreaName';
            angular.element('#'+nextLid)[0].parentElement.innerHTML='<li id="'+nextLid+'"></li>';
            angular.element('#'+nextLid).html(obj.textContent);
            $scope.changeDisplay(obj.id,angular.element('#'+nextLid)[0].parentElement.id,false);
        }
    };
    //选回默认的区域
    $scope.clearSelectedArea=function(){
        $scope.currentSelectAreaId=$rootScope.cache.permissionAreaId;
        angular.element('#rootLi').addClass('option_active');
        var lis=angular.element('#report_options_detail li');
        lis.removeClass('option_active');
    };

});
/*报表实例的单独作用域*/
app.controller('reportKeyIndexRankingController',function($scope,paramsService,communicateService){
    $scope.report_titles=['营销单元','数值','排名'];
    $scope.queryReport=function(){
        var rankKpi=angular.element('#keyIndexRanking-select-rankKpi')[0].value;
        var rankRange=angular.element('#keyIndexRanking-select-rankRange')[0].value;
        var content={
//            "acctDate":paramsService.currentDateStr,
            "acctDate":"20140827",
            "rankKpi":rankKpi,
            "rankRange":rankRange
        };
        communicateService.communicate(paramsService.targetService,paramsService.targetMethod,content).success(function(data){
            if(data && data.isSuccess==0){
                return;
            }else{
                console.log(data);
                angular.element('.tbody_buffer').remove();
                for(var i=0;i<data.rankList.length;i++){
                    var item=data.rankList[i];
                    var trs='<tr class="tbody_buffer"><td>'+item.areaName+'</td><td>'+item.indexValue+'</td><td>'+item.rankValue+'</td></tr>';
                    angular.element('#report_tbody').append(trs);
                }
            }
        })
    }
});
app.controller('reportGridJifenDayController',function($scope,reportService,paramsService){
    $scope.report_titles=[];
    var content={
//        "acctDate":paramsService.currentDateStr,
        "acctDate":"20141201",
        "areaId":paramsService.currentSelectAreaId,
        "statType":"D"
    };
});