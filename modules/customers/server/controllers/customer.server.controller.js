/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var path = require('path');
var mongoose = require("mongoose");
var Customer = mongoose.model("Customer");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var customer = new Customer(req.body);

    customer.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(customer);
        }
    });
};

exports.update = function (req, res) {
    var customer = Customer.findById(req.params.customerId).exec(function (err, customer) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!customer) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            customer.name = req.body.name;
            customer.contact = req.body.contact;
            customer.address = req.body.address;
            customer.taxId = req.body.taxId;
            customer.phone = req.body.phone;
            customer.email = req.body.email;
            customer.url = req.body.url;

            customer.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(customer);
                }
            });
        }
    })
};

exports.list = function (req, res) {
    Customer.find({deleted:false}, function (err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);
        }
    });
};

exports.read = function (req, res) {
    Customer.findById(req.params.customerId, function (err, customer) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!customer) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            console.log(customer);
            res.json(customer);
        }
    });
};

exports.delete = function (req, res) {
    Customer.findById(req.params.customerId).exec(function (err, customer) {
        if (err) {
            console.log('err');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!customer) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            customer.delete(function (err) {
                if (err) {
                    console.log('error');
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    console.log('success');
                    res.json(customer);
                }
            });
        }
    });
};