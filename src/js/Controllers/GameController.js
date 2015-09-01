angular.module('game', [])
    .controller('newGameCtrl', ['$scope', 'db', function($scope, db){
        $scope.game = {
            game: 11,
            serves: 5,
            p1_name: '',
            p2_name: '',
            p1_score: 0,
            p2_score: 0,
            p_start_game: '',
            begginer: '',
            p_iam: false,
            p_win: '',
            createdAt: moment().format("DD.MM.YYYY HH:mm"),
            date: moment().format("DD.MM.YYYY")
        };

        $scope.serves = 0;
        $scope.p1_check = true;
        $scope.p2_check = true;
        $scope.innings_count = 0;
        $scope.currentPlayer = '';
        $scope.gameEnable = true;

        var players = [];
        var playerCurrentPointer = -1;

        $scope.setCurrentPlayer = function(){
            $scope.currentPlayer = players[$scope.game.p_start_game];
            playerCurrentPointer = $scope.game.p_start_game;
            $scope.game.begginer = players[$scope.game.p_start_game];
        };

        $scope.$watch('game.p1_name', function(){
            $scope.p1_check = $scope.game.p1_name != '' ? false : true;
            players[-1] = $scope.game.p1_name;
        });
        $scope.$watch('game.p2_name', function(){
            $scope.p2_check = $scope.game.p2_name != '' ? false : true;
            players[1] = $scope.game.p2_name;
        });

        $scope.setIam = function() {
          $scope.game.p1_name = $scope.game.p_iam ? "Yuriy T" : "";
        };

        $scope.p1_plus = function(){
            $scope.game.p1_score++;
            process();

        };
        $scope.p2_plus = function() {
            $scope.game.p2_score++;
            process();
        };

        function process()
        {
            $scope.innings_count++;

            if ($scope.innings_count >= $scope.game.serves) {
                $scope.innings_count = 0;
                $scope.currentPlayer = getNextPlayer();
            }
            if ($scope.game.p1_score >= $scope.game.game) {
                $scope.game.p_win = players[-1];
                $scope.gameEnable = false;
            }
            if ($scope.game.p2_score >= $scope.game.game) {
                $scope.game.p_win = players[1];
                $scope.gameEnable = false;
            }
        }

        function getNextPlayer()
        {
            playerCurrentPointer *= -1;
            return players[playerCurrentPointer];
        }

        $scope.saveGame = function() {
            db.addAuto($scope.game);
        };
        $scope.clearGame = function(){
            $scope.game = {
                game: 11,
                serves: 5,
                p1_name: '',
                p2_name: '',
                p1_score: 0,
                p2_score: 0,
                p_start_game: '',
                begginer: '',
                p_iam: false,
                p_win: '',
                createdAt: moment().format("DD.MM.YYYY HH:mm"),
                date: moment().format("DD.MM.YYYY")
            };
            $scope.gameEnable = true;
            $scope.innings_count = 0;
            $scope.currentPlayer = '';
        };

        //$scope.get = function(){
        //    db.getAll().then(function(response){
        //        $scope.res = response;
        //    });
        //};

    }]);
