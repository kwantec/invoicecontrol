(function () {
  'use strict';

  angular
    .module('invoices')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Invoices',
      state: 'invoices',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'invoices', {
      title: 'List Invoices',
      state: 'invoices.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'invoices', {
      title: 'Create Invoice',
      state: 'invoices.create',
      roles: ['user']
    });
  }
}());
