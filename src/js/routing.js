'use strict';

/* ui-routing */

angular.module('tennisRoutes', ['ui.router', 'tennisControllers'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('app',{
                    abstract: true,
                    url: '/',
                    template: '<ui-view/>'
                })
                .state('app.home', {
                    url: "home",
                    templateUrl: "views/HomePage/home.html",
                    controller: 'homeCtrl'
                })
                .state('app.newGame', {
                    url: "game",
                    templateUrl: "views/Game/new.html",
                    controller: 'newGameCtrl'
                })
                .state('app.statistic', {
                    url: "statistic",
                    templateUrl: "views/Statistic/statistic.html",
                    controller: 'statisticCtrl'
                })
                .state('app.detailedResult', {
                    url: "result/:id",
                    templateUrl: "views/Results/detail.html",
                    controller: 'resultDetailCtrl'
                })
                .state('app.editResult', {
                    url: "edit/:id",
                    templateUrl: "views/Results/edit.html",
                    controller: 'resultEditCtrl'
                })
                .state('app.removeResult', {
                    url: "remove/:id",
                    controller: function($scope, $stateParams, db, $state) {
                        db.get($stateParams.id).then(function(doc) {
                            return db.rm(doc._id, doc._rev);
                        }).then(function (result) {
                            $state.go("app.results");
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                })
                .state('app.results', {
                    url: "results",
                    templateUrl: "views/Results/results.html",
                    controller: "resultsCtrl"
                })
                .state('app.newResults', {
                    url: "new",
                    templateUrl: "views/Results/new.html",
                    controller: "newResultCtrl"
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);

