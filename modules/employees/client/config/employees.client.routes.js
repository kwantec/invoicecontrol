(function () {
	'use strict';

	// Setting up route
	angular
		.module('employees')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider) {
		// Articles state routing
		$stateProvider
		.state('employees', {
			abstract: true,
			url: '/employees',
			template: '<ui-view/>'
		})
		.state('employees.view', {
			url: '/test',
			templateUrl: 'modules/employees/client/views/view-employee.client.view.html',
			controller: 'EmployeesController'
		})
		.state('employees.create', {
			url: '/create',
			templateUrl: 'modules/employees/client/views/create-employee.client.view.html',
			controller: 'EmployeesController'
		});
	}

	// getEmployee.$inject = ['$stateParams', 'EmployeesService'];

	// function getEmployee($stateParams, EmployeesService){
	// 	// return 
	// }

}());
