(function () {
	'use strict';

	// Employees controller
	angular.module('employees').controller('EmployeesController', ['$scope', '$http', 'EmployeesService',
		function ($scope, $http, EmployeesService) {

			$scope.successTextAlert = "Some content";
			$scope.showSuccessAlert = false;
			$scope.employee = {};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			$scope.submit = function(form){
				EmployeesService.createEmployee($scope.employee).then(function(response){
					console.log("éxito", response);
					$scope.successTextAlert = 'Se ha creado al empleado correctamente!';
					$scope.showSuccessAlert = true;
				}).catch(function(err) {
					console.log("err", err);
				});
			};
		}
	]);
}());
