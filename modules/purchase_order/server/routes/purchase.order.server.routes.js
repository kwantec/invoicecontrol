/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var purchaseOrder = require('../controllers/purchase.order.server.controller');

module.exports = function (app) {
    app.route('/api/purchaseOrders')
        .get(purchaseOrder.list)
        .post(purchaseOrder.create);

    app.route('/api/purchaseOrders/:purchaseOrderId')
        .get(purchaseOrder.read)
        .put(purchaseOrder.update)
        .delete(purchaseOrder.delete);
};