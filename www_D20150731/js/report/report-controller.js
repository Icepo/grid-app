/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.controller('reportController',function($scope,$state,$rootScope,communicateService,paramsService,reportService) {
    $scope.reportContentList = ($rootScope.cache.pages)[2].contentList;
    //选择单个报表
    $scope.reportDetail = function (menu) {
        device.setHorizontal(function(){},function(){});
        document.addEventListener('backbutton',onBackButton,false);
        function onBackButton(){
            device.setVertical(function(){},function(){});
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
            device.setVertical(function(){},function(){});
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
        paramsService.currentSelectAreaId=obj.id;
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
app.controller('reportGridJifenDayController',function($scope){
//    fixupFirstRow($('#report_table_gridJifenDay')[0],1);
    $scope.report_titles=['承包区域名称','分局名称','分公司名称','网格积分汇总','网格积分排名','公众非计时宽带累计发展','非计时宽带发展网格积分','本月趸交到期用户数','上月到期用户数','本月到期本月续约用户数','上月到期上月续约用户数','上月到期本月续约用户数','上月到期未续用户数','上季度网格趸交续约率均值','当月趸交续趸率','当月续趸率网格积分(未含','续趸率网格积分(含同','宽带反抢累计发展','宽带反抢网格积分','宽带合约发展累计发展','包月转合约网格积分','宽带长合约累计发展','宽带合约网格积分(含长','IPTV业务沃家厅店累计发展','IPTV业务网格积分'];
});
app.controller('reportSwwgBusinessDevelopDayController',function($scope,$rootScope,paramsService,communicateService){
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
/**
 * 网格积分月报
 */
app.controller('reportWgjfAdslHuizongNNew3Controller',function($scope){
    $scope.report_titles = ['承包区域名称','分局名称','分公司名称','网格积分汇总','网格积分排名','公众非计时宽带累计发展','非计时宽带发展网格积分','本月趸交到期用户数','上月到期用户数','本月到期本月续约用户数','上月到期上月续约用户数','上月到期本月续约用户数','上月到期未续用户数','上季度网格趸交续约率均值','当月趸交续趸率','当月续趸率网格积分(未含','续趸率网格积分(含同','宽带反抢累计发展','宽带反抢网格积分','宽带合约发展累计发展','包月转合约网格积分','宽带长合约累计发展','宽带合约网格积分(含长','IPTV业务沃家厅店累计发展','IPTV业务网格积分'];
});
/**
 * 三项业务发展到达量佣金统计月报
 */
app.controller('reportWghDicengHuizongController', function ($scope) {
    $scope.report_titles = ['渠道名称','渠道编码','分局名称','分公司名称','合约量','合约佣金标准','IPTV发展量','IPTV佣金标准','目标客户反抢发展量','目标客户反抢佣金标准','发展佣金合计'];
});
/**
 * 包年续约率承包奖励佣金统计
 */
app.controller('reportWghXylDicengController',function($scope){
    $scope.report_titles = ['网格名称','分局名称','分公司名称','合约到期平均数','本网格当期续趸率','奖励标准','续约佣金额度'];
});
/**
 *商务网格业务发展月报
 */
app.controller('reportWghSwwgBusiDevelopMonthController',function($scope){
    $scope.report_titles = ['区域编码','区域名称','统计级别','父级编码','固话发展','固话离网','固话到达','宽带发展','宽带离网','宽带到达','沃商务发展','沃商务离网','沃商务到达','互联网专线发展','互联网专线离网','互联网专线到达','网元发展','网元离网','网元到达'];
});
/**
 * 商务网格收入月报
 */
app.controller('reportWghSwwgBusiIncomeMonthController',function($scope){
    $scope.report_titles = ['区域编码','区域名称','统计级别','父级编码','固话收入','宽带收入','沃商务收入','互联网专线收入','网元收入','其他收入','收入汇总'];
});