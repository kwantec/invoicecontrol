(function () {
  'use strict';

  angular
    .module('loggies')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Loggies',
      state: 'loggies',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'loggies', {
      title: 'List Loggies',
      state: 'loggies.list'
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'loggies', {
      title: 'Calendar',
      state: 'loggies.calendar'
    });

  }
}());
