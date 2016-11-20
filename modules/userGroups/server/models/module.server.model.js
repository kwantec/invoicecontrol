/**
 * Created by Izanami on 10/11/2016.
 * Modified by BuiRai on 13/11/2016.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ModuleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Please fill in a name'
  },
  description: {
    type: String,
    required: 'Please fill in a description'
  },
  permissions: [{
    type: Schema.ObjectId,
    ref: 'Permission'
  }]
});

/**
 * Method for add permissions
 * @param permissions one Array with the permissionId's (strings)
 */
ModuleSchema.methods.addPermissions = function (permissionsIds) {
  var Permission = mongoose.model('Permission');
  var permissions = this.permissions;
  return Permission
    .find({ permissionId: { $in : permissionsIds } })
    .exec().then(function (permissionsItems) {
      permissionsItems.forEach(function (permission) {
        permissions.push(permission._id);
      });
    });
};

mongoose.model('Module', ModuleSchema);
