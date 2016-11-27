'use strict';

angular.module('purchaseOrders').run(['Menus',
    function (Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Órdenes de Compra',
            state: 'purchase-orders',
            type: 'dropdown',
            roles: ['*']
        });

        Menus.addSubMenuItem('topbar', 'purchase-orders', {
            title: 'Lista de Órdenes de Compra',
            state: 'purchase-orders.list'
        });

        Menus.addSubMenuItem('topbar', 'purchase-orders', {
            title: 'Agregar Nueva Orden de Compra',
            state: 'purchase-orders.create'
        });
    }
]);