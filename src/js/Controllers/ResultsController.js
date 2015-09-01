angular.module('result', [])
    .controller('resultsCtrl',['$scope', 'db', '$timeout', function($scope, db, $timeout){
        $scope.allRows = [];
        $scope.myRows = [];

        $scope.rowsStore = [];
        $scope.rowsMyStore = [];
        $scope.busy = false;
        $scope.rowsTotal = 0;
        $scope.rowsPerPage = 5;
        $scope.currentPage = 0;
        $scope.currentMyPage = 0;

        $timeout(function(){
            getRows($scope.currentPage++);
            getMyRows($scope.currentMyPage++);
        }, 500);

        $scope.loadMoreRows = function(){
            if ($scope.busy == true || $scope.currentPage >= $scope.pagesCount) return;
            $scope.busy = true;
            getRows($scope.currentPage++);
        };
        $scope.loadMoreMyRows = function(){
            if ($scope.busy == true || $scope.currentMyPage >= $scope.pagesMyCount) return;
            $scope.busy = true;
            getMyRows($scope.currentMyPage++);
        };

        function getRows(page) {
            var data = $scope.allRows.slice(page * $scope.rowsPerPage - $scope.rowsPerPage, page * $scope.rowsPerPage);
            $scope.rowsStore = $scope.rowsStore.concat(data);
            $scope.pagesCount = $scope.allRows.length;
            $scope.busy = false;
        }
        function getMyRows(page) {
            var data = $scope.myRows.slice(page * $scope.rowsPerPage - $scope.rowsPerPage, page * $scope.rowsPerPage);
            $scope.rowsMyStore = $scope.rowsMyStore.concat(data);
            $scope.pagesMyCount = $scope.myRows.length;
            $scope.busy = false;
        }

        db.getAll().then(function(result){
            $scope.allRows = result.rows;
            $scope.rowsTotal = $scope.allRows.length;
            $scope.myRows = $scope.allRows.filter(function(el){
                return el.doc.p_iam === true;
            });

            $scope.$digest();
        });
    }])
    .controller('resultDetailCtrl', ['$scope', 'db', '$stateParams', function($scope, db, $stateParams){
        $scope.player = {};
        db.get($stateParams.id).then(function(response){
            $scope.player = response;
            $scope.$digest();
        });
    }])
    .controller('newResultCtrl', ['$scope', 'db', function($scope, db){
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

        var players = [];
        $scope.p1_check = true;
        $scope.p2_check = true;

        $scope.setCurrentPlayer = function(){
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
        $scope.saveGame = function() {
            db.addAuto($scope.game);
            this.clearGame();
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
        };
    }])
    .controller('resultEditCtrl', ['$scope', 'db', '$stateParams', '$state', function($scope, db, $stateParams, $state){
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
        db.get($stateParams.id).then(function(response){
            $scope.game = response;
            $scope.$digest();
        });
        var players = [];
        $scope.p1_check = true;
        $scope.p2_check = true;

        $scope.setCurrentPlayer = function(){
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
        $scope.saveGame = function() {
            db.addAuto($scope.game).then(function(res){
                $state.go("app.detailedResult", {id: $stateParams.id});
            });
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
        };
    }])
;
