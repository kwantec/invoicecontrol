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
