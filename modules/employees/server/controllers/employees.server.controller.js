'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Employee = mongoose.model('Employee'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an employee
 */
// exports.create = function (req, res) {
//   var payload = req.body;
//   console.log('Received emplooye payload to save');
//   console.log(JSON.stringify(savedObject, null, 3));
//
//   var newEmployee = {
//
//   };
//   if (payload.name){
//     newEmployee.name = payload.name;
//   }else{
//     res.status(400).send({message: 'invalid input'});
//     return;
//   }
//
//   var newEmployee = new Employee(payload);
//   newEmployee.save(function(err, savedObject){
//     if (err) {
//       res.status(404).send({message: 'Failed to send'});
//     }else{
//       console.log("Saved employye");
//       console.log(JSON.stringify(savedObject, null, 3));
//       res.status(202).send({message: 'Saved employee'});
//     }
//   });
// };

/**
 *
 * @param rez
 * @param res
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
 * List of Employees
 */
exports.list = function (req, res) {
  Employee.find().exec(function (err, employees) {
    if (err) {
      return res.status(404).send({
        message: 'Failed to read articles'
      });
    } else {
      res.json(employees);
    }
  });
};

