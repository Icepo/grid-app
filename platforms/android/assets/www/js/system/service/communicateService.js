/**
 * Created by liuzhangjun on 2015-6-8.
 */
app.factory('communicateService',['constantService','encryptService','$http',function(constantService,encryptService,$http){
    var transferr=function(serviceName,methodName,data){
        var body=JSON.parse(data);
        var json={
            "mobileParam":{
                "serviceName":serviceName,
                "methodName":methodName
            },
            "mobileBody":body,
            "mobileHead":{
                "client":{
                    "applicationId":"mms",
                    "netType":"WIFI",
                    "versionCode":1,
                    "versionName":"1.0.0-SNAPSHOT"
                },
                "equipment":{
                    "deviceId":"8888888888",
                    "phoneNum":"18600463618",
                    "name":"虚拟测试机",
                    "osName":"Android",
                    "osVersion":"19",
                    "version":"4.2.2"
                },
                "other":{
                    "country":"中国",
                    "lan":"zh",
                    "timeZone":"中国标准时间"
                },
                "personal":{
                    "userId":"111111"
                }

            }
        };
        return JSON.stringify(json);
    };
    /*
    serviceName:需要调用的服务名称
    methodName:需要调用的方法 默认是action
    data:入参
     */
    var communicate = function(serviceName,methodName,data){
        return $http.post(constantService.URL,encryptService.encrypt(transferr(serviceName,methodName,data)));
    };
    //离线测试数据
    var communicateTest = function(serviceName,methodName,data){
        var json;
        if(serviceName=='loginService'){
            json = $http.get('json/cache.json');
        }else if(serviceName=='appService'){
            if(data=='quotaTotalData'){
                json = $http.get('json/quotaTotalData.json');
            }else if(data=='quotaDataList'){
                json = $http.get('json/quotaDataList.json');
            }
        }
        return json;
    };
    return {
        'communicate':communicate,
        'communicateTest':communicateTest
    }
}]);