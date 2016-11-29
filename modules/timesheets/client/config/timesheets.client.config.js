(function() {
  'use strict';

  // Timesheets module config
  angular
    .module('timesheets')
    .run(['Menus', menuConfig ]);//.run(menuConfig);

  //menuConfig.$inject = ['Menus'];

  //function menuConfig(Menus) {
    function menuConfig(Menu) {
    // Set top bar menu items
        Menu.addMenuItem('topbar', {
            title: 'Timesheets',
            state: 'timesheets',
            type: 'dropdown',
            roles: ['*']
        });

        // Add the dropdown list item
        Menu.addSubMenuItem('topbar', 'timesheets', {
            title: 'List Timesheets',
            state: 'timesheets.list'
        });

        // Add the dropdown create item
        Menu.addSubMenuItem('topbar', 'timesheets', {
            title: 'Create Timesheets',
            state: 'timesheets.create',
            roles: ['user']
        });
  }
})();
