/**
 * Created by liuzhangjun on 2015-6-8.
 */
app.factory('constantService',function(){
    var URL='http://localhost:8081/app/webservice/jaxrs/mobileService/execute';
    var ENC_KEY='1!QAZ2@WSXCDE#3$4RFVBGT%5^6YHNMJU7&8*IK<.LO9(0P';
    var ENC_IV='12481632';
    var HOME='掌上营销';
    var QUOTA='指标';
    var REPORT='报表';
    var MORE='更多';
    var LINE_CHART='折线图';
    var COLUMN_CHART='柱状图';
    var LIST='列表图';
    return{
        'URL':URL,
        'ENC_KEY':ENC_KEY,
        'ENC_IV':ENC_IV,
        'HOME':HOME,
        'QUOTA':QUOTA,
        'REPORT':REPORT,
        'MORE':MORE,
        'LINE_CHART':LINE_CHART,
        'COLUMN_CHART':COLUMN_CHART,
        'LIST':LIST
    }
});