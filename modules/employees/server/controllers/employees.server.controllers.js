'use strict';
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee");

exports.create = function (req, res) {
    var employee = new Employee(req.body);

    employee.save(function (err) {
        if (!err) {
            console.log("Sucesfull")
        } else {
            console.log(err);
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
