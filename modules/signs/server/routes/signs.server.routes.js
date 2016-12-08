'use strict';

/**
 * Module dependencies
 */
var signsPolicy = require('../policies/signs.server.policy'),
  signs = require('../controllers/signs.server.controller');

module.exports = function(app) {
  // Signs Routes
  app.route('/api/signs').all(signsPolicy.isAllowed)
    .get(signs.list)
    .post(signs.create);

  app.route('/api/signs/:signId').all(signsPolicy.isAllowed)
    .get(signs.read)
    .put(signs.update)
    .delete(signs.delete);

  // Finish by binding the Sign middleware
  app.param('signId', signs.signByID);
};
