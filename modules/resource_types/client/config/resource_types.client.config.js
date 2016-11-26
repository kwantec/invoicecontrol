'use strict';

// Configuring the ResourceTypes module
angular.module('resourceTypes').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Tipos de Recurso',
      state: 'resource-types',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'resource-types', {
      title: 'Lista de Tipos de Recurso',
      state: 'resource-types.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'resource-types', {
      title: 'Crear un Tipo de Recurso',
      state: 'resource-types.create'
    });
  }
]);
