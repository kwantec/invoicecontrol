'use strict';

var permissions = require('../controllers/permissions.server.controller');
var userGroups = require('../controllers/userGroups.server.controller');

/**
 * Routes of the API
 * @param  {app} app [The app where the routes are registered]
 */
module.exports = function (app) {
	app.route('/api/permissions')
		.get(permissions.list);
		//.post(permissions.create);

	app.route('/api/permissions/:permissionId')
		.get(permissions.read);
		//.put(permissions.update)
		//.delete(permissions.delete);

	app.route('/api/permissions/userGroup/:userGroupId')
		.get(permissions.permissionsByUserGroup);

	app.param('permissionId', permissions.permissionById);
	app.param('userGroupId', userGroups.userGroupById);
};
