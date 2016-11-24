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

/**
 * Module init function.
 */
module.exports = seedModules;

function seedModules() {

  mongoose.Promise = global.Promise;

  var employees = new Module({
    _id: '583771bc7595ee8c2b668005',
    name:'employees',
    description: 'module for the employees'
  });
  var client = new Module({
    _id: '583771bc7595ee8c2b668006',
    name:'client',
    description: 'module for the clients'
  });
  var team = new Module({
    _id: '583771bc7595ee8c2b668007',
    name:'team',
    description: 'module for the teams'
  });
  var resourceType = new Module({
    _id: '583771bc7595ee8c2b668008',
    name:'resourceType',
    description: 'module for the resources types'
  });
  var purchaseOrder = new Module({
    _id: '583771bc7595ee8c2b668009',
    name:'purchaseOrder',
    description: 'module for the employees'
  });
  var invoices = new Module({
    _id: '583771bc7595ee8c2b66800a',
    name:'invoices',
    description: 'module for the invoices'
  });
  var logs = new Module({
    _id: '583771bc7595ee8c2b66800b',
    name:'logs',
    description: 'module for the logs'
  });
  var teamsheets = new Module({
    _id: '583771bc7595ee8c2b66800c',
    name:'teamsheets',
    description: 'module for the teamsheets'
  });
  var user = new Module({
    _id: '583771bc7595ee8c2b66800d',
    name:'user',
    description: 'module for the employees'
  });
  var group = new Module({
    _id: '583771bc7595ee8c2b66800e',
    name:'group',
    description: 'module for the employees'
  });
  var permission = new Module({
    _id:'583771bc7595ee8c2b66800f',
    name:'permission',
    description: 'module for the permissions'
  });

  return Module.remove().then(function () {
    var promisesModules = [];

    addPermissions(employees,['list','create','read','update','delete']);
    addPermissions(client,['list','create','read','update','delete']);
    addPermissions(team,['list','create','read','update','delete']);
    addPermissions(resourceType,['list','create','read','update','delete']);
    addPermissions(purchaseOrder,['list','create','read','update','delete']);
    addPermissions(invoices,['list','create','read','update','delete']);
    addPermissions(logs,['list','create','read','update','delete']);
    addPermissions(teamsheets,['list','create','read','update','delete']);
    addPermissions(user,['list','create','read','update','delete']);
    addPermissions(group,['list','create','read','update','delete']);
    addPermissions(permission,['assign']);

    return Promise.all(promisesModules);

    function addPermissions(module,permissions) {
      module.addPermissions(permissions)
        .then(function () {
          promisesModules.push(module.save());
        });
    }
  });
}
