/**
 * Created by liuzhangjun on 2015/5/23.
 */
app.config(['$stateProvider',function($stateProvider){
    $stateProvider
        .state('report',{
            url:'/report',
            views:{
                'app':{
                    templateUrl:'report_detail.html'
                }
            }
        })
        .state('report.detail',{
            url:'/detail',
            views:{
                'report_detail_top':{
                    templateUrl:'report_detail_top.html',
                    controller:'reportController'
                },
                'report_detail_bottom':{
                    template:'<div ui-view="report_detail_list" id="report_detail_list"></div>'
                }
            }
        })
        .state('report.detail.list',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list.html',
                    controller:'reportList'
                },
                'report_options_select':{
                    templateUrl:'report_options.html'
                }
            }
        })
}]);