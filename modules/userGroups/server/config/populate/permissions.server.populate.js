/**
 * Created by Izanami on 15/11/2016.
 */
'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose');
var Permission = mongoose.model('Permission');
/**
 * Module init function.
 */
module.exports = seedPermissions;

function seedPermissions() {

  var create = new Permission({
    permissionId: 'create',
    label: 'create',
    description: 'Permission for create a resource'
  });
  var read = new Permission({
    permissionId: 'read',
    label: 'read',
    description: 'Permission for read a resource'
  });
  var update = new Permission({
    permissionId: 'update',
    label: 'update',
    description: 'Permission for update a resource'
  });
  var remove = new Permission({
    permissionId: 'delete',
    label: 'delete',
    description: 'Permission for delete a resource'
  });
  var list = new Permission({
    permissionId: 'list',
    label: 'list',
    description: 'Permission for list a resource'
  });
  var assign = new Permission({
    permissionId: 'assign',
    label: 'assign',
    description: 'Permission for assign a permission'
  });

  return Permission.remove().then(function () {
    var promisesPermissions = [];

    promisesPermissions.push(create.save());
    promisesPermissions.push(read.save());
    promisesPermissions.push(update.save());
    promisesPermissions.push(remove.save());
    promisesPermissions.push(list.save());
    promisesPermissions.push(assign.save());

    return Promise.all(promisesPermissions);
  });
}
