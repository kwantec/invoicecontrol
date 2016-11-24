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
var Module = mongoose.model('Module');
var Permission = mongoose.model('Permission');

/**
 * Module init function.
 */
module.exports = seedUserGroups;

function seedUserGroups() {

  var admin = new UserGroup({
    _id: '583773d9c7cbed3023ec101f',
    name: 'admin',
    description: 'User group for the administrator',
    permissions:[]
  });
  var user = new UserGroup({
    _id: '583773d9c7cbed3023ec1020',
    name: 'user',
    description: 'User group for the simple user ',
    permissions:[]
  });

  UserGroup.remove({ name: admin.name })
    .then(assignAllPermissions(admin))
    .then(function () {
      admin.save();
    });

  UserGroup.remove({ name: user.name })
    .then(assignPermissions(user,['logs.create','logs.view','logs.update','logs.list','group.read']))
    .then(function () {
      user.save();
    });
}

function assignPermissions(userGroup, permissions) {
  return function () {
    var promisesUserGroup = [];
    permissions.forEach(function (permissionModule) {
      var userGroupPermission = {};
      var tokens = permissionModule.split('.');
      var module = tokens[0];
      var permission = tokens[1];
      var promise = Module.findOne({ name: module }).exec()
        .then(function (module) {
          userGroupPermission.module = module._id;
          return Permission.findOne({ permissionId: permission }).exec();
        }).then(function (permission) {
          userGroupPermission.permission = permission._id;
          userGroup.permissions.push(userGroupPermission);
        });
      promisesUserGroup.push(promise);
    });
    return Promise.all(promisesUserGroup);
  };
}

function assignAllPermissions(userGroup) {
  return function () {
    return Module.find({}).populate('permissions').exec()
      .then(function (modules) {
        modules.forEach(function (module) {
          console.log(module);
          module.permissions.forEach(function (permission) {
            var userGroupPermission = {
              module: module._id,
              permission: permission._id
            };
            userGroup.permissions.push(userGroupPermission);
          });
        });
      },function (err) {
        console.log(err);
      });
  };
}
