'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.validateUsername = function (req, res) {
	if (req.userFinded === true) {
		res.json({usernameValid: false});
	} else {
		res.json({usernameValid: true});
	}
};

exports.userByUsername = function (req, res, next, id) {
	User.findOne({'displayName': id }, function (err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			req.userFinded = false;
			console.log("No se encontró");

		} else {
			req.userFinded = true;
			console.log("Si se encontró");
		}
		
		next();
	});
};