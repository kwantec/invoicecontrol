/**
 * Created by Izanami on 15/11/2016.
 */

'use strict';

/**
 * Module dependencies
 */
var path = require('path');
var mongoose = require('mongoose');
var Module = mongoose.model("Module");
var Permission = mongoose.model('Permission');
var ObjectId = mongoose.Schema.ObjectId;

/**
 * Module init function.
 */
module.exports = function (db) {

  //Module.remove();

  db.connection.db.dropCollection('modules',function (err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Successfully dropped collection: ', 'modules');
    }
  });

  var employees = new Module({
    name:'employees',
    description: 'module for the employees'
  });

  var client = new Module({
    name:'client',
    description: 'module for the employees'
  });
  var team = new Module({
    name:'team',
    description: 'module for the employees'
  });
  var resourceType = new Module({
    name:'resourceType',
    description: 'module for the employees'
  });
  var purchaseOrder = new Module({
    name:'purchaseOrder',
    description: 'module for the employees'
  });
  var invoices = new Module({
    name:'invoices',
    description: 'module for the employees'
  });
  var logs = new Module({
    name:'logs',
    description: 'module for the employees'
  });
  var teamsheets = new Module({
    name:'teamsheets',
    description: 'module for the employees'
  });
  var user = new Module({
    name:'user',
    description: 'module for the employees',
    permissions: []
  });
  addPermission(user,'create');
  user.save(function (err) {
    console.log(err);
  });
  var group = new Module({
    name:'group',
    description: 'module for the employees'
  });
  var permission = new Module({
    name:'permission',
    description: 'module for the employees'
  });
};


function addPermission(module,permissionId) {
  Permission
    .findOne({ permissionId: permissionId })
    .exec(function (err,permission) {
      if(!err) {
        module.permissions.push(permission._id);
        module.save();
      }
      console.log(module);
    });
}
