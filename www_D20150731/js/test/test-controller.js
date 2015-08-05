/**
 * Created by liuzhangjun on 2015-6-8.
 */
app.controller('testController',['communicateService','$scope',function(communicateService,$scope){
    $scope.data='{"hello":"word"}';
    $scope.serviceName="appService";
    $scope.methodName="action";
    $scope.actionType="LOCAL";
    $scope.show=function(){
        console.log($scope.data);
        console.log(JSON.parse($scope.data));
        communicateService
            .communicate($scope.serviceName,$scope.methodName,$scope.data,$scope.actionType)
            .success(function(data){
                console.log(data);
            })
            .error(function(){
                console.log("communication failed");
            });
    }
    $scope.device=device;
    $scope.screenOrientation="";
    var callback=function(deviceOrientation){
        $scope.screenOrientation=deviceOrientation;
    };
    $scope.setScreenOrientation=function(param){
        alert(param);
        device.setHorizontal(function(){},function(){});
        document.addEventListener('backbutton',onBackButton,false);
        function onBackButton(){
            device.setVertical(function(){},function(){});
            document.removeEventListener('backbutton',onBackButton,false);
        }
        alert(param+999);
    }
}]);
