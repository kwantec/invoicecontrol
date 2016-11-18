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
	var user = new User(	req.body);
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

exports.delete = function (req, res) {
	var usergroup = req.usergroup;

	usergroup.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usergroup);
		}
	});
};

exports.update = function (req, res) {
	var usergroup = req.usergroup;

	usergroup.name = req.body.name;
	usergroup.description = req.body.description;
	usergroup.users = req.body.users;
	usergroup.permissions = req.body.permissions;

	usergroup.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(usergroup);
		}
	});
};

exports.list = function (req, res) {
	UserGroup.find().sort('name').select('-permissions -created -__v -users').exec(function (err, permissions) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(permissions);
		}
	});
};


exports.read = function (req, res) {
	res.json(req.usergroup);
};

exports.userGroupById = function (req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'UserGroup is invalid'
		});
	}

	UserGroup.findById(id).populate('permissions.module').populate('permissions.permission').populate('users', 'username firstName lastName profileImageURL').exec(function (err, usergroup) {
		if (err) {
			return next(err);
		} else if (!usergroup) {
			return res.status(404).send({
				message: 'No user group with that identifier has been found'
			});
		}
		req.usergroup = usergroup;
		next();
	});
};
