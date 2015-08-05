//main
var app=angular.module('app',['toaster','ngAnimate','ui.router']);
//配置请求头
app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain=true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
});
//单例的服务来完成参数传递
app.factory('paramsService',function(){
    var doArray=function(array,count){
        var list=array.concat(0);
        list.pop();
        var resultLength=Math.ceil(list.length/count);
        var resultArray=new Array(resultLength);
        for(var i=0;i<resultLength;i++){
            var subArray=new Array();
            for(var j=0;j<count;j++){
                if(list.length>0){
                    subArray[j]=list.shift();
                }
            }
            resultArray[i]=subArray;
        }
        return resultArray;
    };
    return {
        'doArray':doArray
    };
});
//cordova入口
document.addEventListener('deviceready',function(){},false);
