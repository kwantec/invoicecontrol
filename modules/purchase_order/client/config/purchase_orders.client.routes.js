(function () {
    'use strict';

    angular
        .module('purchaseOrders')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('purchase-orders', {
                abstract: true,
                url: '/purchase-orders',
                template: '<ui-view/>'
            })
            .state('purchase-orders.create', {
                url: '/create',
                controller: 'PurchaseOrdersController',
                templateUrl: 'modules/purchase_order/client/views/create-purchase_order.client.view.html'
            })
            .state('purchase-orders.list', {
                url: '/list',
                controller: 'PurchaseOrdersController',
                templateUrl: 'modules/purchase_order/client/views/list-purchase_orders.client.view.html'
            })
            .state('purchase-orders.edit', {
                url: '/:purchaseOrderId/edit',
                controller: 'PurchaseOrdersController',
                templateUrl: 'modules/purchase_order/client/views/edit-purchase_order.client.view.html'
            })
            .state('purchase-orders.view', {
                url: '/:purchaseOrderId',
                controller: 'PurchaseOrdersController',
                templateUrl: 'modules/purchase_order/client/views/view-purchase_order.client.view.html'
            });
    }
})();