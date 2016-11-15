'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Timesheet Schema
 */
var TimesheetSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Timesheet name',
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

mongoose.model('Timesheet', TimesheetSchema);
