angular.module('WarriorsWay')
.controller('WarriorController', ['WarriorTypes', 'Battler', '$scope', function (WarriorTypes, Battler, $scope) {
			$scope.fields = {};
			$scope.fields.player = [{
					'type' : 0,
					'count' : 0
				}, {
					'type' : 1,
					'count' : 0
				}, {
					'type' : 2,
					'count' : 0
				}
			];
			$scope.fields.enemy = [{
					'type' : 0,
					'count' : 0
				}, {
					'type' : 1,
					'count' : 0
				}, {
					'type' : 2,
					'count' : 0
				}
			];
			$scope.fields.berserker = false;
			$scope.wins = [false, false, false];
			$scope.won = function (id) {
				if ($scope.wins[id]) {
					return 'won';
				} else {
					return 'lost';
				}
			};

			$scope.getTotal = function (army) {
				var total = 0;
				for (var i = 0; i < army.length; i++) {
					total += army[i].count;
				}
				return total;
			};

			$scope.warriorTypes = WarriorTypes.getTypes();
			$scope.perfect = function (id) {
				var perfect = true;
				var defeat = true;
				for (var i = 0; i < $scope.fields.enemy.length; i++) {
					var result = Battler.doBattle($scope.fields.player[id].type, $scope.fields.player[id].count, $scope.fields.enemy[i].type, $scope.fields.enemy[i].count, $scope.fields.berserker);
					if (result > 0) {
						defeat = false;
					} else {
						perfect = false;
					}
				}
				if (defeat) {
					return 'defeat';
				}
				if (perfect) {
					return 'perfect';
				}
			};

			$scope.toBattle = function () {
				console.log("TO BATTLE!");
				for (var i = 0; i < $scope.fields.player.length; i++) {
					var result = Battler.doBattle($scope.fields.player[i].type, $scope.fields.player[i].count, $scope.fields.enemy[i].type, $scope.fields.enemy[i].count, $scope.fields.berserker);
					$scope.wins[i] = (result > 0);
				}
			}
			console.log("Warrior Controller initialized.");
		}
	]);
