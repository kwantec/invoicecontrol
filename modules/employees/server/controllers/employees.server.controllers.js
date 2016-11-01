'use strict';
<<<<<<< HEAD
var path = require('path');
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var employee = new Employee(req.body);

    employee.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(employee);
        }
    });
};

exports.list = function (req, res) {
    Employee.find({}, function (err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    });
};
