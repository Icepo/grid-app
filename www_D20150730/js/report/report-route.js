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
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list.html',
                    controller:'reportListController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.keyIndexRanking',{
            url:'/keyIndexRanking',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header_keyIndexRanking.html',
                    controller:'reportKeyIndexRankingController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option_keyIndexRanking.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list.html',
                    controller:'reportKeyIndexRankingController'
                }
            }
        })
        .state('report.detail.gridJifenDay',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_gridJifenDay.html',
                    controller:'reportGridJifenDayController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.swwgBusinessDevelopDay',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_swwgBusinessDevelopDay.html',
                    controller:'reportSwwgBusinessDevelopDayController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.wgjfAdslHuizongNNew3',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_wgjfAdslHuizongNNew3.html',
                    controller:'reportWgjfAdslHuizongNNew3Controller'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.wghDicengHuizong',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_wghDicengHuizong.html',
                    controller:'reportWghDicengHuizongController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.wghXylDiceng',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_wghXylDiceng.html',
                    controller:'reportWghXylDicengController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.wghSwwgBusiDevelopMonth',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_wghSwwgBusiDevelopMonth.html',
                    controller:'reportWghSwwgBusiDevelopMonthController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
        .state('report.detail.wghSwwgBusiIncomeMonth',{
            url:'/list',
            views:{
                'report_detail_top_header':{
                    templateUrl:'report_detail_top_header.html',
                    controller:'reportController'
                },
                'report_detail_top_option':{
                    templateUrl:'report_detail_top_option.html',
                    controller:'reportListController'
                },
                'report_detail_list':{
                    templateUrl:'report_detail_list_wghSwwgBusiIncomeMonth.html',
                    controller:'reportWghSwwgBusiIncomeMonthController'
                },
                'report_options_select':{
                    templateUrl:'report_options.html',
                    controller:'reportListController'
                }
            }
        })
}]);