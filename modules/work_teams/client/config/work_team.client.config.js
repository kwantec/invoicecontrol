'use strict';

// Configuring the ResourceTypes module
angular.module('workTeams').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Equipos de Trabajo',
      state: 'work-teams',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'work-teams', {
      title: 'Lista de Equipos de Trabajo',
      state: 'work-teams.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'work-teams', {
      title: 'Crear un Equipo de Trabajo',
      state: 'work-teams.create',
    });
  }
]);
