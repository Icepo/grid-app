/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.controller('reportController',function($scope,$state,$rootScope) {
    $scope.reportContentList = ($rootScope.cache.pages)[2].contentList;
    $scope.reportDetail = function (menu) {
        $rootScope.reportTitle=menu.menuName;
        console.log(menu);
        $state.go('report.detail.list');
    };
    $scope.back = function () {
        history.back();
    };
    $scope.showOptions = function () {
        $state.go('report.detail.options')
    };
    $rootScope.optionShow = false;
    $scope.changeDisplay = function () {
        $rootScope.optionShow = !($rootScope.optionShow);
    };
    $scope.optionSelected_1 = 0;
    $scope.changeOption = function ($event) {
        var obj = $event.target;
        $scope.optionSelected_1 = obj.id;
        console.log(obj.id);
    };
});
app.controller('reportList',function($scope,$rootScope){
    $scope.changeDisplay = function () {
        $rootScope.optionShow = !($rootScope.optionShow);
    };
    $scope.data= {
        titles: [
            {
                id: 'prop_1',
                name: '集渠编码'
            },
            {
                id: 'prop_2',
                name: '沃家庭店'
            },
            {
                id: 'prop_3',
                name: '账期'
            },
            {
                id: 'prop_4',
                name: '所属分公司'
            },
            {
                id: 'prop_5',
                name: '所属分局'
            },
            {
                id: 'prop_6',
                name: '长合约发展量'
            }
        ],
        items: [
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            },
            {
                prop_1: '11b15q9',
                prop_2: '北京一家不知名的小公司',
                prop_3: '201502',
                prop_4: '四区',
                prop_5: '北苑分局',
                prop_6: '10023'
            }
        ]
    }
});