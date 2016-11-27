'use strict';

angular.module('customers').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Clientes',
            state: 'customers',
            type: 'dropdown',
            roles: ['*']
        });

        Menus.addSubMenuItem('topbar', 'customers', {
            title: 'Lista de Clientes',
            state: 'customers.list'
        });

        Menus.addSubMenuItem('topbar', 'customers', {
            title: 'Agregar un Cliente',
            state: 'customers.create'
        });
    }
]);