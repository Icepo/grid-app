/**
 * Created by liuzhangjun on 2015-7-16.
 */
app.factory('quotaService',function(paramsService,$rootScope,communicateService,$state){
    var quotaDetail=function(quotaId){
        var currentDate;
        if(paramsService.quotaTotalData){
            currentDate=paramsService.quotaTotalData.currentDate;
        }else{
            currentDate=new Date();
        }
        var content={
            "indexCode":quotaId,
            "areaId":$rootScope.cache.permissionAreaId,
            "areaType":$rootScope.cache.areaType,
            "billingCycle":currentDate.getFullYear()+(currentDate.getMonth()<9?'0':'')+(currentDate.getMonth()+1)+(currentDate.getDate()<10?'0':'')+(currentDate.getDate())
        };
        communicateService.communicate('indexDataDateService','queryIndexDataList',content).success(function(data){
            paramsService.quotaTitle=data.quotaName;
            data.currentDate=currentDate;
            paramsService.quotaTotalData = data;
            $state.go('quota.chart.linechart');
        });
    };
    return {
        'quotaDetail':quotaDetail
    }
});