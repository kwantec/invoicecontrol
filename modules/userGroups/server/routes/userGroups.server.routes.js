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

    app.route('/api/userGroups')
    	.get(userGroups.list)
    	.post(userGroups.create);
    
    app.route('/api/userGroups/:userGroupId') //obtener grupo por ID
        .get(userGroups.read)
        .delete(userGroups.delete)

    // Finish by binding the employee middleware
    app.param('username', userGroups.userByUsername);
    app.param('userGroupId', userGroups.userGroupById);
};
