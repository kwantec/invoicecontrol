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

  var adminGroup = new UserGroup({
    _id: '583773d9c7cbed3023ec101f',
    name: 'admin',
    description: 'User group for the administrator',
    permissions:[
      { module: '583771bc7595ee8c2b66800d',permission:'583770a5a973620017c77650' },
      { module: '583771bc7595ee8c2b66800d',permission:'583770a5a973620017c77653' },
      { module: '583771bc7595ee8c2b66800d',permission:'583770a5a973620017c77654' },
      { module: '583771bc7595ee8c2b66800d',permission:'583770a5a973620017c77651' },
      { module: '583771bc7595ee8c2b66800d',permission:'583770a5a973620017c77652' },
      { module: '583771bc7595ee8c2b66800e',permission:'583770a5a973620017c77650' },
      { module: '583771bc7595ee8c2b66800e',permission:'583770a5a973620017c77653' },
      { module: '583771bc7595ee8c2b66800e',permission:'583770a5a973620017c77654' },
      { module: '583771bc7595ee8c2b66800e',permission:'583770a5a973620017c77651' },
      { module: '583771bc7595ee8c2b66800e',permission:'583770a5a973620017c77652' },
    ]
  });
  var userGroup = new UserGroup({
    _id: '583773d9c7cbed3023ec1020',
    name: 'user',
    description: 'User group for the simple user ',
    permissions:[]
  });

  UserGroup.remove({ _id: adminGroup._id })
    //.then(assignAllPermissions(adminGroup))
    //.then(listAllPermissions)
    .then(function (permissionsGroup) {
      //adminGroup.permissions = permissionsGroup;
      adminGroup.save();
    })
    .catch(function (err) {
      console.log(err)
    });

  UserGroup.remove({ _id: userGroup._id })
    .then(findPermissions(['logs.create','logs.view','logs.update','logs.list','group.read']))
    .then(function (permissions) {
      console.log(permissions);
      userGroup.permissions = permissions;
      userGroup.save();
    }).catch(function (err) {
      console.log(err);
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
          //console.log(module);
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

function listAllPermissions() {
  return new Promise(function (resolve, reject) {
    var permissionsGroup = [];
    Module.find({}).populate('permissions').exec()
      .then(function (modules) {
        if(!modules) reject(modules);
        for (var m = 0; m < modules.length; m++) {
          for (var p = 0; p <modules[m].permissions.length; p++) {
            permissionsGroup.push({ module:modules[m]._id, permission: modules[m].permission[p]._id })
          }
        }
        resolve(permissionsGroup);
      });
  });
}

function findPermissions(permissions) {
  var promisesUserGroup = [];
  for (var i = 0; i < permissions.length; i++) {
    var tokens = permissions[i].split('.');
    var module = tokens[0];
    var permission = tokens[1];
    promisesUserGroup.push(findOnePermission(module,permission));
  }
  return Promise.all(promisesUserGroup);
}

function findOnePermission(smodule, spermission) {
  var userGroupPermission = {};
  return Module.findOne({ name: smodule }).exec()
    .then(function (module) {
      userGroupPermission.module = module._id;
      return Permission.findOne({ permissionId: spermission }).exec();
    }).then(function (permission) {
      userGroupPermission.permission = permission._id;
      return userGroupPermission;
    });
}
