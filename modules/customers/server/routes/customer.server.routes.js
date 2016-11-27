/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var customers = require('../controllers/customer.server.controller');

module.exports = function (app) {
    app.route('/api/customers')
        .get(customers.list)
        .post(customers.create);

    app.route('/api/customers/:customerId')
        .get(customers.read)
        .put(customers.update)
        .delete(customers.delete);
};