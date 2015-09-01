angular.module('statistic', [])
    .controller('statisticCtrl', ['$scope', 'db', function($scope, db){

        function getYuriyRows(doc) {
            if (doc.p_iam) {
                emit(doc);
            }
        }
        function getAllRows (doc) {
            emit(doc);
        }
        function getUniqDates(r) {
            var uniqDates = [];
            var i =0;
            for (i = 0; i < r.length; i++) {
                if (uniqDates.indexOf(r[i].doc.date) == -1) {
                    uniqDates.push(r[i].doc.date);
                }
            }

            return uniqDates;
        }
        function proceed (config, mapFunc) {
            var yuriyRows, uniqDates = [];
            var days = {
                game11: [],
                game21: [],
                game11YuriyWin: [],
                game21YuriyWin: []
            };
            db.query(mapFunc).then(function(result){
                yuriyRows = result.rows;

                yuriyRows.sort(function(a, b){
                    if (a.doc.date > b.doc.date) {
                        return 1;
                    }
                    if (a.doc.date < b.doc.date) {
                        return -1;
                    }

                    return 0;
                });
                uniqDates = getUniqDates(yuriyRows);

                uniqDates.forEach(function(currDay){
                    days.game11.push(
                        yuriyRows.filter(function(el){
                            return el.doc.date == currDay && el.doc.game == 11;
                        }).reduce(function(prev, current){
                            return prev + 1;
                        }, 0)
                    );

                    days.game21.push(
                        yuriyRows.filter(function(el){
                            return el.doc.date == currDay && el.doc.game == 21;
                        }).reduce(function(prev, current){
                            return prev + 1;
                        }, 0)
                    );
                });
                var seriesArrAll = [];
                var seriesArrMy = [];
                switch (config) {
                    case 'allConfig':
                        $scope.chartConfigForAll.xAxis.categories = uniqDates;

                        seriesArrAll.push({
                            name: "game 11",
                            data: days.game11
                        });
                        seriesArrAll.push({
                            name: "game 21",
                            data: days.game21
                        });
                        $scope.chartConfigForAll.series = seriesArrAll;
                        break;
                    case 'myConfig':
                        $scope.chartConfigMy.xAxis.categories = uniqDates;

                        uniqDates.forEach(function(currDay){
                            days.game11YuriyWin.push(
                                yuriyRows.filter(function(el){
                                    return el.doc.date == currDay && el.doc.game == 11 && el.doc.p_win == "Yuriy T";
                                }).reduce(function(prev, current){
                                    return prev + 1;
                                }, 0)
                            );

                            days.game21YuriyWin.push(
                                yuriyRows.filter(function(el){
                                    return el.doc.date == currDay && el.doc.game == 21 && el.doc.p_win == "Yuriy T";
                                }).reduce(function(prev, current){
                                    return prev + 1;
                                }, 0)
                            );
                        });

                        seriesArrMy.push({
                            name: "game 11",
                            data: days.game11,
                            color: "green"
                        });
                        seriesArrMy.push({
                            name: "game 11 Winner",
                            data: days.game11YuriyWin,
                            type: "spline",
                            color: "lightgreen"
                        });
                        seriesArrMy.push({
                            name: "game 21",
                            data: days.game21,
                            color: "blue"
                        });
                        seriesArrMy.push({
                            name: "game 21 Winner",
                            data: days.game21YuriyWin,
                            type: "spline",
                            color: "lightblue"
                        });

                        $scope.chartConfigMy.series = seriesArrMy;
                        break;
                }
                $scope.$digest();
            });
        }

        proceed('allConfig', getAllRows);
        proceed('myConfig', getYuriyRows);

        $scope.chartConfigForAll = {
            options: {
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    width: null
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    },
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                }
            },
            title: {
                text: 'Общая статистика по типам игр.'
            },
            xAxis: {
                categories: [],
                title: {
                    text: 'Дата'
                }
            },
            yAxis: {
                title: {
                    text: 'Количетво игр'
                }
            },

            series: []
        };
        $scope.chartConfigMy = {
            options: {
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    width: null
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    },
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    },
                    spline: {
                        marker: {
                            enabled: true
                        },
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                }
            },
            title: {
                text: 'Моя статистика по типам игр.'
            },
            xAxis: {
                categories: [],
                title: {
                    text: 'Дата'
                }
            },
            yAxis: {
                title: {
                    text: 'Количетво игр'
                }
            },

            series: []
        };
    }])
;
