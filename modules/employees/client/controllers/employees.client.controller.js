(function () {
	'use strict';
	
	// Employees controller
	angular.module('employees').controller('EmployeesController', ['$scope', '$stateParams', '$http', 'EmployeesService',
		function ($scope, $stateParams, $http, EmployeesService) {

			$scope.successTextAlert = "Some content";
			$scope.showSuccessAlert = false;
			$scope.employee = {};
			$scope.findedEmployee = {};

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

			$scope.findEmployee = function () {
				var id = $stateParams.employeeId;
				console.log("El id es: ", id);
				EmployeesService.findEmployee(id).then(function (response) {
					$scope.findedEmployee = response.data;
				}).catch(function (err) {
					console.log("err", err);
				});
			};
		}
	]);

	angular.module('employees').controller('ListEmployeesController',['$scope', 'EmployeesService',
		function($scope,EmployeesService){
			EmployeesService.listEmployees().then(function(response){
				$scope.listEmployees = response.data;
				console.log($scope.listEmployees);
			}).catch(function(err){
				console.log("Error")
			})
		}]);
}());
