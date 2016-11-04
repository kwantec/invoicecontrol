(function () {
	'use strict';
	
	// Employees controller
	angular.module('employees').controller('EmployeesController', ['$scope', '$log', '$uibModal', '$location', '$stateParams', '$http', 'EmployeesService','SweetAlert','$state',
		function ($scope, $log, $uibModal, $location, $stateParams, $http, EmployeesService,SweetAlert,$state) {
			var $ctrl = this;
		
			$scope.successTextAlert = 'Some content';
			$scope.showSuccessAlert = false;
			$scope.employee = {};
			$scope.findedEmployee = {};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			console.log($scope.employee);

			$scope.submit = function(){
				EmployeesService.createEmployee($scope.employee).then(function(response){
					$scope.successTextAlert = 'Se ha creado al empleado correctamente!';
					$scope.showSuccessAlert = true;
					$scope.employee = {};
					$scope.formEmployee.$setUntouched();
				}).catch(function(err) {
					console.log('err', err);
				});
			};

			$scope.edit = function () {
				var id = $stateParams.employeeId;
				EmployeesService.editEmployee($scope.findedEmployee, id).then(function () {
					$scope.successTextAlert = 'Se ha editado al empleado correctamente!';
					$scope.showSuccessAlert = true;
				}).catch(function (err) {
					console.log('err', err);
				});
			};

			$scope.findEmployee = function () {
				var id = $stateParams.employeeId;
				console.log('El id es: ', id);
				EmployeesService.findEmployee(id).then(function (response) {
					$scope.findedEmployee = response.data;
					$scope.findedEmployee.dateOfBirthday = new Date(response.data.dateOfBirthday);
				}).catch(function (err) {
					console.log('err', err);
				});
			};

			$scope.onEdit = function(id){
				$state.go('employees.edit',{employeeId: id});
				EmployeesService.editEmployee($scope.findedEmployee, id).then(function () {
					$scope.successTextAlert = 'Se ha editado al empleado correctamente!';
					$scope.showSuccessAlert = true;
				}).catch(function (err) {
					console.log('err', err);
				});
			};

			$scope.onRemove = function(id){
				SweetAlert.swal({
						title: '¿Estás seguro(a) de borrar el empleado?',
						text: 'No podras recuperar este registro',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#DD6B55',confirmButtonText: 'Si',
						cancelButtonText: 'No',
						closeOnConfirm: false,
						closeOnCancel: false },
					function(isConfirm){
						if (isConfirm) {

							EmployeesService.deleteEmployee(id).then(function(response){
								if(response.data.message =='deleted'){
									SweetAlert.swal('Borrado!', 'success');
									$state.go('employees.list');
								}
							}).catch(function(err){
								SweetAlert.swal('Error!', 'error');
							});

						} else {
							SweetAlert.swal('Cancelado','', 'error');
						}
					});
			};
		}
	]);

	angular.module('employees').controller('ListEmployeesController',['$scope', 'EmployeesService','SweetAlert',
		function($scope,EmployeesService,SweetAlert){
			
			EmployeesService.listEmployees().then(function(response){
				$scope.listEmployees = response.data;
				
			}).catch(function(err){
				console.log('Error');
			});



			$scope.delete_employee = function(index){
				var id = $scope.listEmployees[index]._id;

				SweetAlert.swal({
						title: '¿Estás seguro(a) de borrar el empleado?',
						text: 'No podras recuperar este registro',
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#DD6B55',confirmButtonText: 'Si',
						cancelButtonText: 'No',
						closeOnConfirm: false,
						closeOnCancel: false },
					function(isConfirm){
						if (isConfirm) {

							EmployeesService.deleteEmployee(id).then(function(response){
								console.log(response.data);
								if(response.data.message =='deleted'){
									$scope.listEmployees.splice(index,1);
									console.log($scope.listEmployees);
									SweetAlert.swal('Borrado!', 'success');
								}
							}).catch(function(err){
								SweetAlert.swal('Error!', 'error');
							});

						} else {
							SweetAlert.swal('Cancelado','', 'error');
						}
					});


			};
		}]);
}());
