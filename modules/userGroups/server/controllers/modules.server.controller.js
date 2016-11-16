'use strict';

var path = require('path');
var mongoose = require("mongoose");
var Module = mongoose.model("Module");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Function to create a module
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.create = function (req, res) {
	var module = new Module(req.body);

	module.save(function (err, _module) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_module);
		}
	});
};

/**
 * Function to list all the modules
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.list = function (req, res) {
	Module.find().sort('name').select('_id name permissions').populate('permissions','-_id').populate('permissions.permissionId','_id label').exec(function (err, modules) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(modules);
		}
	});
};

/**
 * Function to read just one module
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.read = function (req, res) {
	var module = req.module ? req.module.toJSON() : {}; 
	res.json(module);
};

/**
 * Function to update a module
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.update = function (req, res) {
	var module = req.module;

	module.description = req.body.description;
	module.name = req.body.name;

	module.save(function (err, _module) {
		if (err) {
			return res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_module);
		}
	});
};

/**
 * Function to delete a module
 * @param  {req} req [The request]
 * @param  {res} res [The response]
 */
exports.delete = function (req, res) {
	var module = req.module;

	module.remove(function (err, _module) {
		if (err) {
			res.status(404).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(_module);
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
exports.moduleById = function (req, res, next, id) {
	Module.findById(id, function (err, module) {
		if (err) {
			next(err);
		} else if (!module) {
			return res.status(404).send({
				message: 'No module with that identifier has been found'
			});
		}
		req.module = module;
		next();
	});
};