'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	UserGroup = mongoose.model('UserGroup'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.registryUser = function (req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init variables
	var user = new User(req.body);
	var message = null;

	// // Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user
	user.save(function (err) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			res.json(user);
		}
	});
};

exports.validateUsername = function (req, res) {
	if (req.userFinded === true) {
		// If userfinded, send false, because you CAN'T save a user with this username
		res.json({usernameValid: false});
	} else {
		// Other case, send true
		res.json({usernameValid: true});
	}
};

exports.userByUsername = function (req, res, next, username) {
	// The username exist?
	User.findOne({'username': username }, function (err, user) {
		if (err) {
			return next(err);
		} else if (!user) {
			// If dont exist, no userfinded
			req.userFinded = false;
			console.log("No se encontró");

		} else {
			// If exist, so, userfinded
			req.userFinded = true;
			console.log("Si se encontró");
		}
		
		// Next middleware
		next();
	});
};

exports.create = function (req, res) {
	var userGroup = new UserGroup(req.body);

	console.log("Lo del body:", req.body);
	console.log("UserGroup model:", userGroup);

	// res.json(userGroup);

	userGroup.save(function (err, _userGroup) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_userGroup);
		}
	});
};

exports.list = function (req, res) {
	Permission.find().sort('name').exec(function (err, permissions) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(permissions);
		}
	});
};