'use strict';

var permissions = require('../controllers/permissions.server.controller');

/**
 * Routes of the API
 * @param  {app} app [The app where the routes are registered]
 */
module.exports = function (app) {
	app.route('/api/permissions')
		.get(permissions.list)
		.post(permissions.create);

	app.route('/api/permissions/:permissionId')
		.get(permissions.read)
		.put(permissions.update)
		.delete(permissions.delete);

	app.param('permissionId', permissions.permissionById);
};
