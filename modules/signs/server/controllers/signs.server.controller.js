'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Sign = mongoose.model('Sign'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Sign
 */
exports.create = function(req, res) {
  var sign = new Sign(req.body);
  sign.user = req.user;

  sign.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sign);
    }
  });
};

/**
 * Show the current Sign
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var sign = req.sign ? req.sign.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  sign.isCurrentUserOwner = req.user && sign.user && sign.user._id.toString() === req.user._id.toString();

  res.jsonp(sign);
};

/**
 * Update a Sign
 */
exports.update = function(req, res) {
  var sign = req.sign;

  sign = _.extend(sign, req.body);

  sign.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sign);
    }
  });
};

/**
 * Delete an Sign
 */
exports.delete = function(req, res) {
  var sign = req.sign;

  sign.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sign);
    }
  });
};

/**
 * List of Signs
 */
exports.list = function(req, res) {
  Sign.find().sort('-created').populate('user', 'displayName').exec(function(err, signs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(signs);
    }
  });
};

/**
 * Sign middleware
 */
exports.signByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Sign is invalid'
    });
  }

  Sign.findById(id).populate('user', 'displayName').exec(function (err, sign) {
    if (err) {
      return next(err);
    } else if (!sign) {
      return res.status(404).send({
        message: 'No Sign with that identifier has been found'
      });
    }
    req.sign = sign;
    next();
  });
};
