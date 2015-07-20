/**
 * Created by liuzhangjun on 2015-7-19.
 */
app.service('reportService',function(communicateService,paramsService){
    var queryReport=function(targetService,targetMethod,content){
        communicateService.communicate(targetService,targetMethod,content).success(function(data){
            if(data && data.isSuccess==0){
                return;
            }else{
                console.log(data);
                /*angular.element('.tbody_buffer').remove();
                for(var i=0;i<data.rankList.length;i++){
                    var item=data.rankList[i];
                    var trs='<tr class="tbody_buffer"><td>'+item.areaName+'</td><td>'+item.indexValue+'</td><td>'+item.rankValue+'</td></tr>';
                    angular.element('#report_tbody').append(trs);
                }*/
            }
        })
    };
    var showReport=function(currentReport,data){
        angular.element('.tbody_buffer').remove();
        var trs='';
        for(var i=0;i<data.length;i++){
            trs+='<tr class="tbody_buffer">'
            var item=data[i];
            trs+='</tr>'
        }
        angular.element('#report_tbody').append(trs);
    };
    return{
        'queryReport':queryReport
    }
});