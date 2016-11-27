'use strict';

angular.module('clients').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Clientes',
            state: 'clients',
            type: 'dropdown',
            roles: ['*']
        });

        Menus.addSubMenuItem('topbar', 'clients', {
            title: 'Lista de Clientes',
            state: 'clients.list'
        });

        Menus.addSubMenuItem('topbar', 'clients', {
            title: 'Agregar un Cliente',
            state: 'clients.create'
        });
    }
]);