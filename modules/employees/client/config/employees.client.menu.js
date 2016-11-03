(function () {
	'use strict';

	angular
		.module('employees')
		.run(menuConfig);

	menuConfig.$inject = ['menuService'];

	function menuConfig(menuService) {
		menuService.addMenuItem('topbar', {
			title: 'Empleados',
			state: 'employees',
			type: 'dropdown',
			roles: ['*']
		});

		// Add the dropdown list item
		menuService.addSubMenuItem('topbar', 'employees', {
			title: 'Crear nuevo empleado',
			state: 'employees.create',
			roles: ['*']
		});
		menuService.addSubMenuItem('topbar', 'employees', {
			title: 'Lista de empleados',
			state: 'employees.list',
			roles: ['*']
		});
	}
}());
