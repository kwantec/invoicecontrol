/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var path = require('path');
var mongoose = require("mongoose");
var PurchaseOrder = mongoose.model("PurchaseOrder");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var purchaseOrder = new PurchaseOrder(req.body);

    purchaseOrder.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(purchaseOrder);
        }

    });
};


exports.update = function (req, res) {
    PurchaseOrder.findById(req.params.purchaseOrderId).exec(function (err, purchaseOrder) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!purchaseOrder) {
                return res.status(404).send({
                    message: "No se encontro la orden de compra"
                });
            }

            purchaseOrder.purchaseNumber = req.body.purchaseNumber;
            purchaseOrder.name = req.body.name;
            purchaseOrder.description = req.body.description;
            purchaseOrder.assignedAmount = req.body.assignedAmount;
            purchaseOrder.remainingAmount = req.body.remainingAmount;

            purchaseOrder.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(purchaseOrder);
                }

            });


        }
    })
};


exports.list = function (req, res) {
    PurchaseOrder.find({deleted:false}, function (err, purchaseOrder) {
        if (err) {
            console.log(err);
        } else {
            res.json(purchaseOrder);
        }
    });
};


exports.read = function (req, res) {
    PurchaseOrder.findById(req.params.purchaseOrderId, function (err, purchaseOrder) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!purchaseOrder) {
                return res.status(404).send({
                    message: "No se encontro la orden de compra"
                });
            }

            res.json(purchaseOrder);
        }
    });
};


exports.delete = function (req, res) {
    PurchaseOrder.findById(req.params.purchaseOrderId).exec(function (err, purchaseOrder) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!purchaseOrder) {
                return res.status(404).send({
                    message: "No se encontro la orden de compra"
                });
            }

            purchaseOrder.delete(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(purchaseOrder);
                }
            });
        }

    });
};