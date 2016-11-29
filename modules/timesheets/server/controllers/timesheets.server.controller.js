'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Timesheet = mongoose.model('Timesheet'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Timesheet
 */
exports.create = function(req, res) {
  var timesheet = new Timesheet(req.body);
  timesheet.user = req.user;

  timesheet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheet);
    }
  });
};

/**
 * Show the current Timesheet
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var timesheet = req.timesheet ? req.timesheet.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  timesheet.isCurrentUserOwner = req.user && timesheet.user && timesheet.user._id.toString() === req.user._id.toString();

  res.jsonp(timesheet);
};

/**
 * Update a Timesheet
 */
exports.update = function(req, res) {
  var timesheet = req.timesheet;

  timesheet = _.extend(timesheet, req.body);

  timesheet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheet);
    }
  });
};

/**
 * Delete an Timesheet
 */
exports.delete = function(req, res) {
  var timesheet = req.timesheet;

  timesheet.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheet);
    }
  });
};

/**
 * List of Timesheets
 */
exports.list = function(req, res) {
  Timesheet.find().sort('-created').populate('user', 'displayName').exec(function(err, timesheets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheets);
    }
  });
};

/**
 * Timesheet middleware
 */
exports.timesheetByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Timesheet is invalid'
    });
  }

  Timesheet.findById(id).populate('user', 'displayName').exec(function (err, timesheet) {
    if (err) {
      return next(err);
    } else if (!timesheet) {
      return res.status(404).send({
        message: 'No Timesheet with that identifier has been found'
      });
    }
    req.timesheet = timesheet;
    next();
  });
};
