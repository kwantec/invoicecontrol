'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Group name',
    trim: true
  },
  description:{
    type: String
  },
  permissions: {
    type: Array
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Group', GroupSchema);
