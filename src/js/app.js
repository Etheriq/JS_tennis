'use strict';

/* Main App */

var tennisApp = angular.module('tennis', [
        'ui.router',
        'tennisServices',
        'tennisFilters',
        'tennisControllers',
        'tennisRoutes',
        'tennisDirectives',
        'ui.bootstrap',
        'highcharts-ng',
        'infinite-scroll'
    ]);

tennisApp.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function( data ) {

        return angular.isObject( data ) && String( data ) !== '[object File]' ? angular.toParam( data ) : data;
    };
}]);
