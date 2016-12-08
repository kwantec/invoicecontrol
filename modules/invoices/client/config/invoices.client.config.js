(function () {
    'use strict';

    angular
        .module('invoices')
        .run(['Menus', menuConfig ]);

    function menuConfig(Menu) {
        // Set top bar menu items
        Menu.addMenuItem('topbar', {
            title: 'Invoices',
            state: 'invoices',
            type: 'dropdown',
            roles: ['*']
        });

        // Add the dropdown list item
        Menu.addSubMenuItem('topbar', 'invoices', {
            title: 'List Invoices',
            state: 'invoices.list'
        });

        // Add the dropdown create item
        Menu.addSubMenuItem('topbar', 'invoices', {
            title: 'Create Invoice',
            state: 'invoices.create',
            roles: ['user']
        });
    }
}());
