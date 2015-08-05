/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.controller('reportController',function($scope,$state,$rootScope,communicateService,paramsService,reportService) {
    $scope.reportContentList = ($rootScope.cache.pages)[2].contentList;
    //选择单个报表
    $scope.reportDetail = function (menu) {
        if(device){
            device.setHorizontal(function(){},function(){});
        }
        document.addEventListener('backbutton',onBackButton,false);
        function onBackButton(){
            if(device){
                device.setVertical(function(){},function(){});
            }
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
        if(device){
            device.setVertical(function(){},function(){});
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
    $scope.changeDisplay = function (areaId,areaType,root) {
        var content={
            "permissionAreaId":areaId
        };
        communicateService.communicate('appUserAreaListService','doGetUserAreaList',content).success(function(data){
            if(data.isSuccess==0){
                return;
            }else{
                if(areaType=='1'){
                    $rootScope.optionAreaList_1=data.areaList;
                    $rootScope.optionAreaList_2=[];
                    $rootScope.optionAreaList_3=[];
                }else if(areaType=='2'){
                    $rootScope.optionAreaList_2=data.areaList;
                    $rootScope.optionAreaList_3=[];
                }else if(areaType=='3'){
                    $rootScope.optionAreaList_3=data.areaList;
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
        paramsService.currentSelectAreaId=obj.id;
        $rootScope.currentAreaName=obj.innerHTML;
        console.log($scope.currentSelectAreaId);
        var parent=obj.parentElement;
        var lis=angular.element('#'+parent.id+' li');
        lis.removeClass('option_active');
        angular.element('#'+obj.id).addClass('option_active');
        if(parent.classList.contains('has-next') && obj.id!=='rootLi'){
            var areaType=parseInt(parent.id.charAt(parent.id.length-1))+1;
            $scope.changeDisplay(obj.id,areaType,false);
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
/*关键指标排名日报*/
app.controller('reportKeyIndexRankingController',function($scope,paramsService,communicateService,$rootScope){
    $rootScope.reportItems=[];
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
                $rootScope.reportItems=data.rankList;
            }
        })
    }
});
/*网格积分日报*/
app.controller('reportGridJifenDayController',function($scope,$rootScope){
    $rootScope.reportItems=[];
    $scope.report_titles=['承包区域名称','分局名称','分公司名称','网格积分汇总','网格积分排名','公众非计时宽带累计发展','非计时宽带发展网格积分','本月趸交到期用户数','上月到期用户数','本月到期本月续约用户数','上月到期上月续约用户数','上月到期本月续约用户数','上月到期未续用户数','上季度网格趸交续约率均值','当月趸交续趸率','当月续趸率网格积分(未含','续趸率网格积分(含同','宽带反抢累计发展','宽带反抢网格积分','宽带合约发展累计发展','包月转合约网格积分','宽带长合约累计发展','宽带合约网格积分(含长','IPTV业务沃家厅店累计发展','IPTV业务网格积分'];
});
/*商务网格业务发展日报*/
app.controller('reportSwwgBusinessDevelopDayController',function($scope,$rootScope,paramsService,communicateService){
    $rootScope.reportItems=[];
    $scope.report_titles=['区域编码','区域名称','统计级别','父级编码','上月总计','第1天','第2天','第3天','第4天','第5天','第6天','第7天','第8天','第9天','第10天','第11天','第12天','第13天','第14天','第15天','第16天','第17天','第18天','第19天','第20天','第21天','第22天','第23天','第24天','第25天','第26天','第27天','第28天','第29天','第30天','第31天','本月总计'];
    $scope.queryReport=function(){
        var busiType=angular.element('#swwgBusinessDevelopDay-select-busiType')[0].value;
        var statType=angular.element('#swwgBusinessDevelopDay-select-statType')[0].value;
        var content={
            "acctDate":"20141201",
            "areaId":paramsService.currentSelectAreaId,
            "busiType":busiType,
            "statType":statType
        };
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
/**
 * 网格积分月报
 */
app.controller('reportWgjfAdslHuizongNNew3Controller',function($scope,$rootScope){
    $rootScope.reportItems=[];
    $scope.report_titles = ['承包区域名称','分局名称','分公司名称','网格积分汇总','网格积分排名','公众非计时宽带累计发展','非计时宽带发展网格积分','本月趸交到期用户数','上月到期用户数','本月到期本月续约用户数','上月到期上月续约用户数','上月到期本月续约用户数','上月到期未续用户数','上季度网格趸交续约率均值','当月趸交续趸率','当月续趸率网格积分(未含','续趸率网格积分(含同','宽带反抢累计发展','宽带反抢网格积分','宽带合约发展累计发展','包月转合约网格积分','宽带长合约累计发展','宽带合约网格积分(含长','IPTV业务沃家厅店累计发展','IPTV业务网格积分'];
});
/**
 * 三项业务发展到达量佣金统计月报
 */
app.controller('reportWghDicengHuizongController', function ($scope,$rootScope) {
    $rootScope.reportItems=[];
    $scope.report_titles = ['渠道名称','渠道编码','分局名称','分公司名称','合约量','合约佣金标准','IPTV发展量','IPTV佣金标准','目标客户反抢发展量','目标客户反抢佣金标准','发展佣金合计'];
});
/**
 * 包年续约率承包奖励佣金统计
 */
app.controller('reportWghXylDicengController',function($scope,$rootScope){
    $rootScope.reportItems=[];
    $scope.report_titles = ['网格名称','分局名称','分公司名称','合约到期平均数','本网格当期续趸率','奖励标准','续约佣金额度'];
});
/**
 *商务网格业务发展月报
 */
app.controller('reportWghSwwgBusiDevelopMonthController',function($scope,$rootScope){
    $rootScope.reportItems=[];
    $scope.report_titles = ['区域编码','区域名称','统计级别','父级编码','固话发展','固话离网','固话到达','宽带发展','宽带离网','宽带到达','沃商务发展','沃商务离网','沃商务到达','互联网专线发展','互联网专线离网','互联网专线到达','网元发展','网元离网','网元到达'];
});
/**
 * 商务网格收入月报
 */
app.controller('reportWghSwwgBusiIncomeMonthController',function($scope,$rootScope){
    $rootScope.reportItems=[];
    $scope.report_titles = ['区域编码','区域名称','统计级别','父级编码','固话收入','宽带收入','沃商务收入','互联网专线收入','网元收入','其他收入','收入汇总'];
});