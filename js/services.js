angular.module('WarriorsWay')
.factory('WarriorTypes', function () {
	return {
		getTypes : function () {
			return [{
					'id' : 0,
					'name' : "Cavalry",
					'weaknesses' : [2]
				}, {
					'id' : 1,
					'name' : "Archers",
					'weaknesses' : [0]
				}, {
					'id' : 2,
					'name' : "Pikemen",
					'weaknesses' : [1]
				}, {
					'id' : 3,
					'name' : "Ninjas",
					'weaknesses' : []
				}
			];
		},
		getType : function (id) {
			return this.getTypes()[id];
		},
		isWeakTo : function (defender, attacker) {
			return ($.inArray(attacker.id, defender.weaknesses) != -1);
		}
	}
})
.factory('Battler', ['WarriorTypes', function (WarriorTypes) {
			return {
				doBattle : function (playerType, playerSize, enemyType, enemySize, berserker) {
					playerType = WarriorTypes.getType(playerType);
					enemyType = WarriorTypes.getType(enemyType);
					var actualPlayer = playerSize;
					var actualEnemy = enemySize;
					if (WarriorTypes.isWeakTo(playerType, enemyType)) {
						if (berserker) {
							actualEnemy *= 5;
						} else {
							actualEnemy *= 2;
						}
					} else if (WarriorTypes.isWeakTo(enemyType, playerType)) {
						actualPlayer *= 2;
					} else if (berserker) {
						actualEnemy *= 2;
					}
					var outcome = this.doRawBattle(actualPlayer, actualEnemy);
					console.log("Player's " + playerSize + " " + playerType.name + " (" + actualPlayer + ") vs. Enemey's " + enemySize + " " + enemyType.name + " (" + actualEnemy + ")");
					return outcome;
				},
				doRawBattle : function (playerSize, enemySize) {
					return (playerSize - enemySize);
				}
			}
		}
	])
.directive('playerSelector', ['WarriorTypes', function (WarriorTypes) {
			return {
				scope : {
					model : '=',
				},
				restrict : 'E',
				template : "<select ng-model='model' ng-options='object.id as object.name for object in types'></select>",
				link : function ($scope) {
					$scope.types = WarriorTypes.getTypes();
				}
			}
		}
	])
.directive('enemySelector', ['WarriorTypes', function (WarriorTypes) {
			return {
				scope : {
					model : '=',
				},
				restrict : 'E',
				template : "<select ng-model='model' ng-options='object.id as object.name for object in types'></select>",
				link : function ($scope) {
					$scope.types = WarriorTypes.getTypes();
				}
			}
		}
	]);
