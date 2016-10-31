'use strict';

/**
 * Module dependencies
 */
var employeesPolicy = require('../policies/employees.server.policy'),
  employees = require('../controllers/employees.server.controller');

module.exports = function(app) {
  // Employees Routes
  app.route('/api/employees').all(employeesPolicy.isAllowed)
    .get(employees.list)
    .post(employees.create);

  app.route('/api/employees/:employeeId').all(employeesPolicy.isAllowed)
    .get(employees.read)
    .put(employees.update)
    .delete(employees.delete);

  // Finish by binding the Employee middleware
  app.param('employeeId', employees.employeeByID);
};
