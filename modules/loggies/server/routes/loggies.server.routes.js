'use strict';

/**
 * Module dependencies
 */
var loggiesPolicy = require('../policies/loggies.server.policy'),
  loggies = require('../controllers/loggies.server.controller');

module.exports = function(app) {
  // Loggies Routes
  app.route('/api/loggies').all(loggiesPolicy.isAllowed)
    .get(loggies.list)
    .post(loggies.create);

  app.route('/api/loggies/:loggyId').all(loggiesPolicy.isAllowed)
    .get(loggies.read)
    .put(loggies.update)
    .delete(loggies.delete);

  // Finish by binding the Loggy middleware
  app.param('loggyId', loggies.loggyByID);
};
