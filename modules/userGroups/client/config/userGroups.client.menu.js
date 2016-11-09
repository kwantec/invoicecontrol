// (function () {
// 	'use strict';

// 	angular
// 		.module('userGroups')
// 		.run(menuConfig);

// 	menuConfig.$inject = ['menuService'];

// 	function menuConfig(menuService) {
// 		menuService.addMenuItem('topbar', {
// 			title: 'Grupo de usuarios',
// 			state: 'userGroups',
// 			type: 'dropdown',
// 			roles: ['*']
// 		});

// 		// Add the dropdown list item
// 		menuService.addSubMenuItem('topbar', 'userGroups', {
// 			title: 'Crear nuevo grupo de usuario',
// 			state: 'userGroups.create',
// 			roles: ['*']
// 		});
// 	}
// }());
