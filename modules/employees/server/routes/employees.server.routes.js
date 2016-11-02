'use strict';

/**
 * Module dependencies
 */
var employee = require('../controllers/employees.server.controller');

module.exports = function (app) {
  // Employees collection routes
  app.route('/api/employees')
    .get(employee.list)
    .post(employee.create);
};
