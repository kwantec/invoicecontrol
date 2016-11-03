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
		.state('employees.create', {
			url: '/create',
			templateUrl: 'modules/employees/client/views/create-employee.client.view.html',
			controller: 'EmployeesController'
		})
		.state('employees.list', {
			url: '/list',
			templateUrl: 'modules/employees/client/views/list-employee.client.view.html',
			controller: 'ListEmployeesController'
		})
		.state('employees.view', {
			url: '/:employeeId',
			templateUrl: 'modules/employees/client/views/view-employee.client.view.html',
			controller: 'EmployeesController'

		});

	}

}());
