'use strict';

var modules = require('../controllers/modules.server.controller');

/**
 * Routes of the API
 * @param  {app} app [The app where the routes are registered]
 */
module.exports = function (app) {
	app.route('/api/modules')
		.get(modules.list)
		.post(modules.create);

	app.route('/api/modules/:moduleId')
		.get(modules.read)
		.put(modules.update)
		.delete(modules.delete);

	app.param('moduleId', modules.moduleById);
};
