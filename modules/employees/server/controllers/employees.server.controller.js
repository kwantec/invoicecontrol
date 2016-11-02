'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Employee = mongoose.model('Employee'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Function to create and save an Employee
 * @param  {Object} req The request sended by the client
 * @param  {Object} res The response, from the server
 * @return {Object}     A json object sended by the server
 */
exports.create = function (req, res) {
  var employee = new Employee(req.body);
  employee.save(function (err) {
    if (err) {
      return res.status(404).send({
        message: 'Failed to send data'
      });
    } else {
      res.json(employee);
    }
  });
};

/**
 * Function to read one employee
 * @param  {Object} req The request sended by the client
 * @param  {Object} res The response, from the server
 * @return {Object}     A json object sended by the server
 */
exports.read = function (req, res) {
  var employee = req.employee ? req.employee.toJSON() : {};
  res.json(employee);
};

/**
 * Function to find one employee by the id parameter
 * @param  {Object} req The request sended by the client
 * @param  {Object} res The response, from the server
 * @param  {Function} next The next middleware to execute
 * @param  {string}   id   The id of the employee to find
 * @return {Object}     A json object sended by the server
 */
exports.employeeById = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({
      message: 'Employee is invalid'
    });
  }

  Employee.findById(id, function (err, employee) {
    if (err) {
      return next(err);
    } else if (!employee) {
      return res.status(404).send({
        message: 'No employee with that identifier has been found'
      });
    }
    req.employee = employee;
    next();
  });
};
