'use strict';

/**
 * Module dependencies
 */
var userGroups = require('../controllers/userGroups.server.controller');

module.exports = function (app) {
    // Employees collection routes

    app.route('/api/user/validateUsername/:username')
        .get(userGroups.validateUsername);

    // Finish by binding the employee middleware
    app.param('username', userGroups.userByUsername);

};
