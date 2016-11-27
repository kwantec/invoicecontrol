'use strict';

angular.module('purchaseOrders').factory('PurchaseOrders', ['$resource',
    function ($resource) {
        return $resource('api/purchaseOrders/:purchaseOrderId', {
            purchaseOrderId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);