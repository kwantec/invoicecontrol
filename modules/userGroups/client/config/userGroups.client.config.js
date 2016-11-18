'use strict';

// Configuring the Articles module
angular.module('userGroups').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Grupos de usuarios',
      state: 'userGroups',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'userGroups', {
      title: 'Crear grupo de usuarios',
      state: 'userGroups.create'
    });
    Menus.addSubMenuItem('topbar', 'userGroups', {
      title: 'Ver lista de grupos',
      state: 'userGroups.list'
    });
  }
]);
