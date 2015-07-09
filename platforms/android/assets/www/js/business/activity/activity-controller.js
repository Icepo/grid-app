/**
 * Created by liuzhangjun on 2015-7-3.
 */
app.controller('activityController',function($scope,$state){
    $scope.activity_items=['1','2'];
    $scope.activityDetail=function(id){
        $state.go('activity.detail');
    };
});