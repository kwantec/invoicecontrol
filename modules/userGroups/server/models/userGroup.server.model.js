'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Group Schema
 */
var UserGroupSchema = new Schema({
  name: {
    type: String,
    default: 'name...',
    required: 'Please fill Group name',
    trim: true
  },
  description:{
    type: String,
    default: 'description...',
    required: 'Please fill Group description',
  },
  permissions: [{
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    },
    permission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission'
    }
  }],
  created: {  
    type: Date,
    default: Date.now
  }
});

mongoose.model('UserGroup', UserGroupSchema);
