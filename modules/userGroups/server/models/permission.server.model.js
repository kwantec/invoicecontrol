/**
 * Created by Izanami on 10/11/2016.
 * Modified by BuiRai on 13/11/2016.
 */

'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  permissionId: {
    type: String,
    trim: true,
    default: 'module.action',
    unique: true,
    lowercase: true,
    required: 'Please fill in an id [module.action]'
  },
  label: {
    type: String,
    default: 'permission label',
    maxlenght: [30, 'The max lenght of the label is 30 characters'],
    required: 'Please fill in a label'
  },
  description: {
    type: String,
    default: 'permission description',
    maxlenght: [150, 'The max lenght of the label is 150 characters'],
    required: 'Please fill in a description'
  }
});

mongoose.model('Permission', PermissionSchema);
