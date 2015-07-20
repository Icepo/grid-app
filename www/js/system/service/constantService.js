/**
 * Created by liuzhangjun on 2015-6-8.
 */
app.factory('constantService',function(){
    var URL='http://132.81.67.150:8082/grid-app/webservice/jaxrs/mobileService/execute';
    var ENC_KEY='1!QAZ2@WSXCDE#3$4RFVBGT%5^6YHNMJU7&8*IK<.LO9(0P';
    var ENC_IV='12481632';
    var HOME='掌上营销';
    var QUOTA='指标';
    var REPORT='报表';
    var MORE='更多';
    var LINE_CHART='折线图';
    var COLUMN_CHART='柱状图';
    var LIST='列表图';
    var QUOTA_D_IMG='img/quota_day.png';
    var QUOTA_M_IMG='img/quota_month.png';
    var QUOTA_DEFAULT_VALUE='0';
    var QUOTA_DEFAULT_NAME='未知指标';
    var QUOTA_COLOR_ARRAY=['#A7CF5D','#FFAF24','#EC5409','#5AC8E3','#6BD189','#5B8EDD','#D063B6','#442A78'];
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
        'LIST':LIST,
        'QUOTA_D_IMG':QUOTA_D_IMG,
        'QUOTA_M_IMG':QUOTA_M_IMG,
        'QUOTA_DEFAULT_VALUE':QUOTA_DEFAULT_VALUE,
        'QUOTA_DEFAULT_NAME':QUOTA_DEFAULT_NAME,
        'QUOTA_COLOR_ARRAY':QUOTA_COLOR_ARRAY
    }
});