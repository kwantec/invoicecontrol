'use strict';

// Configuring the ResourceTypes module
angular.module('customers').run(['Menus',
    function (Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('topbar', {
            title: 'Clientes',
            state: 'customers',
            type: 'dropdown',
            roles: ['*']
        });

        // Add the dropdown list item
        Menus.addSubMenuItem('topbar', 'customers', {
            title: 'Lista de Clientes',
            state: 'customers.list'
        });

        // Add the dropdown create item
        Menus.addSubMenuItem('topbar', 'customers', {
            title: 'Agregar un Cliente',
            state: 'customers.create'
        });
    }
]);