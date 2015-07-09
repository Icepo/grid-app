/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.controller('moreTestController',['communicateService','$scope',function(communicateService,$scope){
    $scope.data='{"hello":"word"}';
    $scope.show=function(){
        console.log($scope.data);
        communicateService.communicate($scope.data).success(function(data){
            console.log(data);
        });
    }
}]);