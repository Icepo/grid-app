
var app=angular.module('app',['ngAnimate','ui.router']);

app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain=true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
//    $httpProvider.defaults.transformRequest = [function(data) {
//        /**
//         * The workhorse; converts an object to x-www-form-urlencoded serialization.
//         * @param {Object} obj
//         * @return {String}
//         */
//        var param = function(obj) {
//            var query = '';
//            var name, value, fullSubName, subName, subValue, innerObj, i;
//
//            for (name in obj) {
//                value = obj[name];
//
//                if (value instanceof Array) {
//                    for (i = 0; i < value.length; ++i) {
//                        subValue = value[i];
//                        fullSubName = name + '[' + i + ']';
//                        innerObj = {};
//                        innerObj[fullSubName] = subValue;
//                        query += param(innerObj) + '&';
//                    }
//                } else if (value instanceof Object) {
//                    for (subName in value) {
//                        subValue = value[subName];
//                        fullSubName = name + '[' + subName + ']';
//                        innerObj = {};
//                        innerObj[fullSubName] = subValue;
//                        query += param(innerObj) + '&';
//                    }
//                } else if (value !== undefined && value !== null) {
//                    query += encodeURIComponent(name) + '='
//                        + encodeURIComponent(value) + '&';
//                }
//            }
//
//            return query.length ? query.substr(0, query.length - 1) : query;
//        };
//
//        return angular.isObject(data) && String(data) !== '[object File]'
//            ? param(data)
//            : data;
//    }];
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
