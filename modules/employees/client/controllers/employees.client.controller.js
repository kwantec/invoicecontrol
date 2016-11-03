(function () {
	'use strict';

	// Employees controller
	angular.module('employees').controller('EmployeesController', ['$scope', '$log', '$uibModal', '$location', '$stateParams', '$http', 'EmployeesService',
		function ($scope, $log, $uibModal, $location, $stateParams, $http, EmployeesService) {
			var $ctrl = this;

			$scope.successTextAlert = "Some content";
			$scope.showSuccessAlert = false;
			$scope.employee = {};
			$scope.findedEmployee = {};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			$scope.submit = function(form){
				EmployeesService.createEmployee($scope.employee).then(function(response){
					$scope.successTextAlert = 'Se ha creado al empleado correctamente!';
					$scope.showSuccessAlert = true;
					$location.path('/employees/' + response.data._id);
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

			$scope.onEdit = function() {
				console.log("Here to edit...");
			};

			$scope.onRemove = function() {
				console.log("Here to remove...");
			};
		}
	]);
}());
