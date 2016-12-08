'use strict';

/**
 * Module dependencies
 */
var invoicesPolicy = require('../policies/invoices.server.policy'),
  invoices = require('../controllers/invoices.server.controller');

module.exports = function(app) {
  // Invoices Routes
  app.route('/api/invoices').all(invoicesPolicy.isAllowed)
    .get(invoices.list)
    .post(invoices.create);

  app.route('/api/invoices/:invoiceId').all(invoicesPolicy.isAllowed)
    .get(invoices.read)
    .put(invoices.update)
    .delete(invoices.delete);

  // Finish by binding the Invoice middleware
  app.param('invoiceId', invoices.invoiceByID);
};
