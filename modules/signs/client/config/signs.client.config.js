(function () {
  'use strict';

  angular
    .module('signs')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Signs',
      state: 'signs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'signs', {
      title: 'List Signs',
      state: 'signs.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'signs', {
      title: 'Create Sign',
      state: 'signs.create',
      roles: ['user']
    });
  }
}());
