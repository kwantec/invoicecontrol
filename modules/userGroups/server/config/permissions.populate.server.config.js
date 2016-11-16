/**
 * Created by Izanami on 15/11/2016.
 */
'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config'));
var mongoose = require('mongoose');
var Permission = mongoose.model('Permission');
/**
 * Module init function.
 */
module.exports = function (app, db) {
  Permission.remove({});

  var create = new Permission({
    permissionId: 'create',
    label: 'create',
    description: 'Permission for create a resource'
  });
  create.save();
  var edit = new Permission({
    permissionId: 'edit',
    label: 'edit',
    description: 'Permission for edit a resource'
  });
  edit.save();
  var update = new Permission({
    permissionId: 'update',
    label: 'update',
    description: 'Permission for update a resource'
  });
  update.save();
  var remove = new Permission({
    permissionId: 'remove',
    label: 'remove',
    description: 'Permission for remove a resource'
  });
  remove.save();
  var list = new Permission({
    permissionId: 'list',
    label: 'list',
    description: 'Permission for list a resource'
  });
  list.save();
  var view = new Permission({
    permissionId: 'view',
    label: 'view',
    description: 'Permission for view a resource'
  });
  view.save();
};
