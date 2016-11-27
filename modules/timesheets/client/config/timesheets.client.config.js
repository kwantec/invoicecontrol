(function () {
  'use strict';

  angular
    .module('timesheets')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Timesheets',
      state: 'timesheets',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'timesheets', {
      title: 'List Timesheets',
      state: 'timesheets.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'timesheets', {
      title: 'Create Timesheet',
      state: 'timesheets.create',
      roles: ['user']
    });
  }
}());
