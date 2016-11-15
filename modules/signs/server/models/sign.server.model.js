'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Sign Schema
 */
var SignSchema = new Schema({
  sign: {
    type: String,
    default: '',
    required: 'Please fill Sign text',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Sign', SignSchema);
