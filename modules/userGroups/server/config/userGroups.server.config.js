'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));
var populate = {
  permissions : require(path.resolve('./modules/userGroups/server/config/populate/permissions.server.populate')),
  modules : require(path.resolve('./modules/userGroups/server/config/populate/modules.server.populate')),
  userGroups : require(path.resolve('./modules/userGroups/server/config/populate/userGroups.server.populate')),
};

/**
 * Module init function.
 */
module.exports = function (app, db) {
  populate.permissions();

  populate.modules(db);

  populate.userGroups();
};
