
var app=angular.module('app',['ngAnimate','ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain=true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
});

//单例的服务来完成参数传递
app.factory('paramsService',function(){
    return {};
});

//document.addEventListener('deviceready',onDeviceReady,false);
//function onDeviceReady(){
//    alert(1);
//    var options = {
//        date: new Date(),
//        mode: 'date'
//    };
//
//    datePicker.show(options, function(date){
//        alert("date result " + date);
//    });
//    alert(2);
//}
