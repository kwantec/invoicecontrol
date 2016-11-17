/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var path = require('path');
var mongoose = require("mongoose");
var ResourceType = mongoose.model("ResourceType");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var resourceType = new ResourceType(req.body);

    resourceType.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(resourceType);
        }

    });
};


exports.update = function (req, res) {
    ResourceType.findById(req.params.resourceTypeId).exec(function (err, resourceType) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!resourceType) {
                return res.status(404).send({
                    message: "No se encontro el recurso"
                });
            }

            resourceType.name = req.body.name;
            resourceType.rates = req.body.name;



            resourceType.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(resourceType);
                }

            });


        }
    })
};


exports.list = function (req, res) {
    ResourceType.find({deleteAt: null}, function (err, resourceType) {
        if (err) {
            console.log(err);
        } else {
            res.json(resourceType);
        }
    });
};

exports.read = function (req, res) {
    ResourceType.findById(req.params.resourceTypeId, function (err, resourceType) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!resourceType) {
                return res.status(404).send({
                    message: "No se encontro el recurso"
                });
            }

            res.json(resourceType);
        }
    });
};


exports.delete = function (req, res) {
    ResourceType.findById(req.params.resourceTypeId).exec(function (err, resourceType) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!resourceType) {
                return res.status(404).send({
                    message: "No se encontro el recurso"
                });
            }

            resourceType.delete(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(resourceType);
                }
            });
        }

    });
};
