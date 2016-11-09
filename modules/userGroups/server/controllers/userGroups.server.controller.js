'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.validateUsername = function (req, res) {
  console.log("Validando username...");
};

exports.userByUsername = function (req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
	    return res.status(404).send({
	      message: 'Employee is invalid'
	    });
  	}

  	User.findOne({'displayName': id }, function (err, user) {
  		console.log("User finded:", user);
  	});
};