'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require("moment-timezone"),
    getNow = function() {
      return moment.tz('UTC').format();
    };

/**
 * Log Schema
 */
var LoggySchema = new Schema({
  activity: {
    type: String,
    default: '',
    required: 'Please fill activity input',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  employee: {
    type: Schema.ObjectId,
    ref: 'Employee'
  },
  workTeam: {
    type: Schema.ObjectId,
    ref: 'WorkTeam'
  },
  created_at: {
    type: Date,
    default: getNow
  }
});

mongoose.model('Loggy', LoggySchema);
