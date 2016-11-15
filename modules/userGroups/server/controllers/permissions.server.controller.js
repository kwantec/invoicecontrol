'use strict';

var path = require('path');
var mongoose = require("mongoose");
var Permission = mongoose.model("Permission");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Function to create a permission
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.create = function (req, res) {
	var permission = new Permission(req.body);

	permission.save(function (err, _permission) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_permission);
		}
	});
};

/**
 * Function to list all the permissions
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
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

/**
 * Function to read just one permission
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.read = function (req, res) {
	var permission = req.permission ? req.permission.toJSON() : {}; 
	res.json(permission);
};

/**
 * Function to update a permission
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.update = function (req, res) {
	var permission = req.permission;

	permission.description = req.body.description;
	permission.label = req.body.label;
	permission.permissionId = req.body.permissionId;

	permission.save(function (err, _permission) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_permission);
		}
	});
};

/**
 * Function to delete a permission
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.delete = function (req, res) {
	var permission = req.permission;

	permission.remove(function (err, _permission) {
		if (err) {
			res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_permission);
		}
	});
};

/**
 * Function to finda permission by id
 * @param  {req}   req  [The request]
 * @param  {res}   res  [The response]
 * @param  {function} next [The next middleware to execute]
 * @param  {Number}   id   [The id]
 */
exports.permissionById = function (req, res, next, id) {
	Permission.findById(id, function (err, permission) {
		if (err) {
			next(err);
		} else if (!permission) {
			return res.status(404).send({
				message: 'No permission with that identifier has been found'
			});
		}
		req.permission = permission;
		next();
	});
};
