angular.module('home', [])
    .controller('homeCtrl', ['$scope', 'db', function($scope, db){

        $scope.countLoad = 0;
        $scope.deletedOk = 0;
        $scope.allRows = 0;
        var fixtures = [
            {
                game: 11,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Vasia',
                p1_score: 8,
                p2_score: 11,
                p_start_game: '1',
                begginer: 'Vasia',
                p_iam: true,
                p_win: 'Vasia',
                createdAt: "11.04.2015 19:14",
                date: "11.04.2015"
            },
            {
                game: 21,
                serves: 2,
                p1_name: 'Stepan',
                p2_name: 'Ivan',
                p1_score: 21,
                p2_score: 17,
                p_start_game: '-1',
                begginer: 'Stepan',
                p_iam: false,
                p_win: 'Ivan',
                createdAt: "11.04.2015 17:25",
                date: "11.04.2015"
            },
            {
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Kostia',
                p1_score: 21,
                p2_score: 15,
                p_start_game: '1',
                begginer: 'Kostia',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "10.04.2015 13:10",
                date: "10.04.2015"
            },{
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Kostia',
                p1_score: 21,
                p2_score: 19,
                p_start_game: '1',
                begginer: 'Kostia',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "11.04.2015 12:14",
                date: "11.04.2015"
            },{
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Sasha',
                p1_score: 21,
                p2_score: 18,
                p_start_game: '-1',
                begginer: 'Yuriy T',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "11.04.2015 12:30",
                date: "11.04.2015"
            },{
                game: 21,
                serves: 2,
                p1_name: 'Yuriy T',
                p2_name: 'Vova',
                p1_score: 15,
                p2_score: 21,
                p_start_game: '-1',
                begginer: 'Yuriy T',
                p_iam: true,
                p_win: 'Vova',
                createdAt: "11.04.2015 12:40",
                date: "11.04.2015"
            },
            {
                game: 11,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Stas',
                p1_score: 11,
                p2_score: 8,
                p_start_game: '1',
                begginer: 'Stas',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "12.04.2015 12:55",
                date: "12.04.2015"
            },
            {
                game: 11,
                serves: 5,
                p1_name: 'Sasha',
                p2_name: 'Stas',
                p1_score: 11,
                p2_score: 10,
                p_start_game: '1',
                begginer: 'Stas',
                p_iam: false,
                p_win: 'Stas',
                createdAt: "12.04.2015 13:00",
                date: "12.04.2015"
            },
            {
                game: 11,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Genia',
                p1_score: 11,
                p2_score: 3,
                p_start_game: '-1',
                begginer: 'Yuriy T',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "11.04.2015 15:25",
                date: "11.04.2015"
            },
            {
                game: 11,
                serves: 2,
                p1_name: 'Yuriy T',
                p2_name: 'Kostia',
                p1_score: 7,
                p2_score: 11,
                p_start_game: '1',
                begginer: 'Kostia',
                p_iam: true,
                p_win: 'Kostia',
                createdAt: "13.04.2015 15:40",
                date: "13.04.2015"
            },
            {
                game: 11,
                serves: 5,
                p1_name: 'Kostia',
                p2_name: 'Stas',
                p1_score: 6,
                p2_score: 11,
                p_start_game: '1',
                begginer: 'Stas',
                p_iam: false,
                p_win: 'Stas',
                createdAt: "11.04.2015 18:00",
                date: "11.04.2015"
            },
            {
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Sergey',
                p1_score: 21,
                p2_score: 15,
                p_start_game: '1',
                begginer: 'Sergey',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "13.04.2015 10:10",
                date: "13.04.2015"
            },
            {
                game: 21,
                serves: 2,
                p1_name: 'Yuriy T',
                p2_name: 'Stas',
                p1_score: 12,
                p2_score: 21,
                p_start_game: '1',
                begginer: 'Stas',
                p_iam: true,
                p_win: 'Stas',
                createdAt: "13.04.2015 12:26",
                date: "13.04.2015"
            },
            {
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Stas',
                p1_score: 21,
                p2_score: 19,
                p_start_game: '1',
                begginer: 'Stas',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "13.04.2015 14:30",
                date: "13.04.2015"
            },
            {
                game: 11,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Sasha',
                p1_score: 5,
                p2_score: 11,
                p_start_game: '1',
                begginer: 'Sasha',
                p_iam: true,
                p_win: 'Sasha',
                createdAt: "14.04.2015 13:10",
                date: "14.04.2015"
            },
            {
                game: 21,
                serves: 5,
                p1_name: 'Yuriy T',
                p2_name: 'Vova',
                p1_score: 21,
                p2_score: 11,
                p_start_game: '1',
                begginer: 'Vova',
                p_iam: true,
                p_win: 'Yuriy T',
                createdAt: "14.04.2015 13:30",
                date: "14.04.2015"
            }
        ];

        $scope.load = function(){
            $scope.deletedOk = 0;
            db.addArray(fixtures).then(function(result){
                $scope.countLoad = result.length;
                getAllRows();
                $scope.$digest();
            });
        };
        $scope.remove = function() {
            $scope.deletedOk = 0;
            $scope.countLoad = 0;
            db.getAll().then(function(response){
                for (var i = 0; i < response.rows.length; i++) {
                    db.rm(response.rows[i].doc).then(function(result){
                        if (result.ok) {
                            $scope.deletedOk++;
                            $scope.$digest();
                        }
                        getAllRows();
                    });
                }
            });
        };
        getAllRows();

        function getAllRows() {
            db.getAll().then(function(result){
                $scope.allRows = result.rows;
                $scope.$digest();
            });
        }
    }]);
