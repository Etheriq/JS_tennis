'use strict';

/* Filters */

var tennisFilters = angular.module('tennisFilters', []);

tennisFilters.filter('count', function(){

    return function(input){
        input = input || '';

        return angular.isArray(input) ? input.length : 0;
    }
});
