'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Invoice = mongoose.model('Invoice'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Invoice
 */
exports.create = function(req, res) {
  var invoice = new Invoice(req.body);
  invoice.user = req.user;

  invoice.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoice);
    }
  });
};

/**
 * Show the current Invoice
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var invoice = req.invoice ? req.invoice.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  invoice.isCurrentUserOwner = req.user && invoice.user && invoice.user._id.toString() === req.user._id.toString();

  res.jsonp(invoice);
};

/**
 * Update a Invoice
 */
exports.update = function(req, res) {
  var invoice = req.invoice;

  invoice = _.extend(invoice, req.body);

  invoice.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoice);
    }
  });
};

/**
 * Delete an Invoice
 */
exports.delete = function(req, res) {
  var invoice = req.invoice;

  invoice.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoice);
    }
  });
};

/**
 * List of Invoices
 */
exports.list = function(req, res) {
  Invoice.find().sort('-created').populate('user', 'displayName').exec(function(err, invoices) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(invoices);
    }
  });
};

/**
 * Invoice middleware
 */
exports.invoiceByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invoice is invalid'
    });
  }

  Invoice.findById(id).populate('user', 'displayName').exec(function (err, invoice) {
    if (err) {
      return next(err);
    } else if (!invoice) {
      return res.status(404).send({
        message: 'No Invoice with that identifier has been found'
      });
    }
    req.invoice = invoice;
    next();
  });
};
