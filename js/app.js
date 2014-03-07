angular.module('WarriorsWay', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/calc', {
				templateUrl : 'views/calc.html'
			});
			$routeProvider.otherwise({
				redirectTo : '/calc'
			});
		}
	]);
