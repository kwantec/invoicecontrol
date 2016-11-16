'use strict';

/**
 * Module dependencies
 */
var timesheetsPolicy = require('../policies/timesheets.server.policy'),
  timesheets = require('../controllers/timesheets.server.controller');

module.exports = function(app) {
  // Timesheets Routes
  app.route('/api/timesheets').all(timesheetsPolicy.isAllowed)
    .get(timesheets.list)
    .post(timesheets.create);

  app.route('/api/timesheets/:timesheetId').all(timesheetsPolicy.isAllowed)
    .get(timesheets.read)
    .put(timesheets.update)
    .delete(timesheets.delete);

  // Finish by binding the Timesheet middleware
  app.param('timesheetId', timesheets.timesheetByID);
};
