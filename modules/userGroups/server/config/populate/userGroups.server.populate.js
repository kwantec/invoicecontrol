/**
 * Created by Izanami on 16/11/2016.
 */

'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));
var mongoose = require('mongoose');
var UserGroup = mongoose.model('UserGroup');

/**
 * Module init function.
 */
module.exports = function (app, db) {

  UserGroup.remove({});

  var admin = new UserGroup({
    name: 'admin',
    description: 'User group for the administrator'
  });
  admin.save();

  var user = new UserGroup({
    name: 'user',
    description: 'User group for the simple user '
  });
  user.save();
};
