'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
    admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
    // User route registration first. Ref: #713
    require('./users.server.routes.js')(app);

    // Users collection routes
    app.route('/api/users')
        .get(admin.list);

    // Single user routes
    app.route('/api/users/:userId')
        .get(admin.read)
        .put(admin.update)
        .delete(admin.delete);

    // Finish by binding the user middleware
    app.param('userId', admin.userByID);
};
