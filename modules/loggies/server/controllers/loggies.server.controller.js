'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Loggy = mongoose.model('Loggy'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Loggy
 */
exports.create = function(req, res) {
  var loggy = new Loggy(req.body);
  loggy.user = req.user;

  loggy.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(loggy);
    }
  });
};

/**
 * Show the current Loggy
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var loggy = req.loggy ? req.loggy.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  loggy.isCurrentUserOwner = req.user && loggy.user && loggy.user._id.toString() === req.user._id.toString();

  res.jsonp(loggy);
};

/**
 * Update a Loggy
 */
exports.update = function(req, res) {
  var loggy = req.loggy;

  loggy = _.extend(loggy, req.body);

  loggy.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(loggy);
    }
  });
};

/**
 * Delete an Loggy
 */
exports.delete = function(req, res) {
  var loggy = req.loggy;

  loggy.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(loggy);
    }
  });
};

/**
 * List of Loggies
 */
exports.list = function(req, res) {
  Loggy.find().sort('-created')
      .populate({
        path : 'employee',
        model: 'Employee'
      })
      .exec(function(err, loggies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(loggies);
    }
  });
};

/**
 * Loggy middleware
 */
exports.loggyByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Loggy is invalid'
    });
  }

  Loggy.findById(id).populate('user', 'displayName').exec(function (err, loggy) {
    if (err) {
      return next(err);
    } else if (!loggy) {
      return res.status(404).send({
        message: 'No Loggy with that identifier has been found'
      });
    }
    req.loggy = loggy;
    next();
  });
};
