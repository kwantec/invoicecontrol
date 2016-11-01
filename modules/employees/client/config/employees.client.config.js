'use strict';

// Configuring the Articles module
angular.module('employees').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Empleados',
      state: 'employees',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'Lista de Empleados',
      state: 'employees.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'Nuevo empleado',
      state: 'employees.create',
      roles: ['user']
    });
  }
]);
