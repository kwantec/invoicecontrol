(function () {
	'use strict';
	
	// Employees controller
	angular.module('employees').controller('EmployeesController', ['$scope', '$location', '$stateParams', '$http', 'EmployeesService',
		function ($scope, $location, $stateParams, $http, EmployeesService) {

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
		}
	]);

	angular.module('employees').controller('ListEmployeesController',['$scope', 'EmployeesService',
		function($scope,EmployeesService){
			EmployeesService.listEmployees().then(function(response){
				$scope.listEmployees = response.data;
				console.log($scope.listEmployees);
			}).catch(function(err){
				console.log("Error");
			});

			$scope.delete_employee = function(index){
				var id = $scope.listEmployees[index]._id;
				EmployeesService.deleteEmployee(id).then(function(response){
					console.log(response.data)
					if(response.data.message =='deleted'){
						$scope.listEmployees.splice(index,1);
						console.log($scope.listEmployees);
					}
				}).catch(function(err){
					console.log('error');
				});
			}
		}]);
}());
