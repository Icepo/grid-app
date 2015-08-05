/**
 * Created by liuzhangjun on 2015-7-22.
 */
app.controller('customerCardController',function($scope,$state,communicateService,$rootScope){
    Array.prototype.remove=function(index){
        if(isNaN(index)||index>=this.length){
            return false;
        }
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[index]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    };
    $scope.searchText='';
    $rootScope.userInfoListBak=new Array();
    $rootScope.userInfoListTemp=new Array();
    communicateService.communicate('');
    $scope.showDetail=function(index){
        $scope.checkInfoText='basic';
        $scope.currentUserShow=$rootScope.userInfoList[index];
        $state.go('customer_card.info.basic');
    };
    $scope.checkInfo=function(text){
        $scope.checkInfoText=text;
        var target='customer_card.info.'+text;
        $state.go(target);
    };
    $scope.historyBack=function(){
        history.back();
    };
    $scope.changeSearch=function(obj){
        console.log(obj);
        var text=obj.searchText;
        if(text){
            for(var i=$rootScope.userInfoListBak.length-1;i>0;i--){
                var item = $rootScope.userInfoListBak[i];
                if(item.custName.indexOf(text)>=0||item.linktele.indexOf(text)>=0){
                    $rootScope.userInfoListBak.remove(i);
                    $rootScope.userInfoListTemp.push(item);
                }
            }
            for(var i=0;i<$rootScope.userInfoList.length;i++){
                var item = $rootScope.userInfoList[i];
                if(item.custName.indexOf(text)<0 && item.linktele.indexOf(text)){
                    $rootScope.userInfoList.remove(i);
                    i--;
                    $rootScope.userInfoListBak.push(item);
                }
            }
            $rootScope.userInfoList.concat($rootScope.userInfoListTemp);
            $rootScope.userInfoListTemp=[];
        }else{
            $rootScope.userInfoList=$rootScope.userInfoListBackUp.concat();
        }
    }
});