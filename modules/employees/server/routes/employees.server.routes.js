'use strict';

/**
 * Module dependencies
 */
var employee = require('../controllers/employees.server.controller');

module.exports = function (app) {
	// Employees collection routes
	app.route('/api/employees')
		.post(employee.create);

	app.route('/api/employees/:employeeId')
		.get(employee.read);

	// Finish by binding the employee middleware
  app.param('employeeId', employee.employeeById);
	
};
