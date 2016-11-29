/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var path = require('path');
var mongoose = require("mongoose");
var Client = mongoose.model("Client");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var client = new Client(req.body);

    client.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(client);
        }
    });
};

exports.update = function (req, res) {
    var client = Client.findById(req.params.clientId).exec(function (err, client) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!client) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            client.name = req.body.name;
            client.contact = req.body.contact;
            client.address = req.body.address;
            client.taxId = req.body.taxId;
            client.phone = req.body.phone;
            client.email = req.body.email;
            client.url = req.body.url;
            client.purchaseOrders = req.body.purchaseOrders;

            client.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(client);
                }
            });
        }
    })
};

exports.list = function (req, res) {
    Client.find({deleted:false}, function (err, clients) {
        if (err) {
            console.log(err);
        } else {
            res.json(clients);
        }
    });
};

exports.read = function (req, res) {
    console.log('Read');

    Client.findById(req.params.clientId, function (err, client) {
        console.log(req.params.clientId);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!client) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            console.log(client);
            res.json(client);
        }
    }).populate("purchaseOrders");
};

exports.delete = function (req, res) {
    Client.findById(req.params.clientId).exec(function (err, client) {
        if (err) {
            console.log('err');
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!client) {
                return res.status(404).send({
                    message: "No se encontro el cliente"
                });
            }

            client.delete(function (err) {
                if (err) {
                    console.log('error');
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    console.log('success');
                    res.json(client);
                }
            });
        }
    });
};