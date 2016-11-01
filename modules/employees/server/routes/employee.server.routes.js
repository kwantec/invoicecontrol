/**
 * Created by Andre on 04/10/2016.
 */
'use strict';

/**
 * Module dependencies.
 */

var employees = require('../controllers/employees.server.controllers');

module.exports = function (app) {
    app.route('/api/employees')
        .get(employees.list)
        .post(employees.create);

    app.route('/api/employees/:employeeId')
        .get(employees.read);
};
