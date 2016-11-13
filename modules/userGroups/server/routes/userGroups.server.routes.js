'use strict';

/**
 * Module dependencies
 */
var userGroups = require('../controllers/userGroups.server.controller');

module.exports = function (app) {
    // Employees collection routes

    app.route('/api/users/validateUsername/:username')
        .get(userGroups.validateUsername);

    app.route('/api/usersGroup/registryUser')
    	.post(userGroups.registryUser);

    // Finish by binding the employee middleware
    app.param('username', userGroups.userByUsername);
};
