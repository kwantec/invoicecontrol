'use strict';

var path = require('path');
var mongoose = require("mongoose");
var Employee = mongoose.model("Employee");
var ResourceType = mongoose.model("ResourceType");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var employee = new Employee(req.body);

ResourceType.findById('583e31fdc93cfed513c438ce', function(err, resource){
    employee.resourceType = resource;
    employee.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(employee);
        }
    });
});

    // employee.resourceType = '583e31fdc93cfed513c438ce';
    
};

exports.update = function (req, res) {
    var employee = Employee.findById(req.params.employeeId).exec(function (err, employee) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!employee) {
                return res.status(404).send({
                    message: 'No se encontró el empleado'
                });
            }
            employee.name = req.body.name;
            employee.lastName = req.body.lastName;
            employee.address.country= req.body.address.country;
            employee.address.state= req.body.address.state;
            employee.address.city= req.body.address.city;
            employee.address.zipCode= req.body.address.zipCode;
            employee.personEmail = req.body.personEmail;
            employee.workEmail = req.body.workEmail;
            employee.rfc = req.body.rfc;
            employee.imss = req.body.imss;
            employee.curp = req.body.curp;
            employee.picture = req.body.picture;
            employee.user = req.body.user;
            employee.resourceType = req.body.resourceType;



            employee.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(employee);
                }
            });
        }
    });
};

exports.list = function (req, res) {
    Employee.find({deleted:false}, function (err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    }).populate("user");
};

exports.read = function (req, res) {
    Employee.findById(req.params.employeeId, function (err, employee) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!employee) {
                return res.status(404).send({
                    message: 'No se encontró el empleado'
                });
            }

            res.json(employee);
        }
    }).populate("user").populate('resourceType');
};

exports.delete = function (req, res) {
    Employee.findById(req.params.employeeId).exec(function (err, employee) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!employee) {
                return res.status(404).send({
                    message: 'No se encontró el empleado'
                });
            }

            employee.delete(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(employee);
                }
            });
        }
    });
};

