'use strict';

// Configuring the Articles module
angular.module('employees').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Employees',
      state: 'employees',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'Employee List',
      state: 'employees.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'New Employee',
      state: 'employees.create'
    });
  }
]);
