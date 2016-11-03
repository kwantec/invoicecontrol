'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  moment = require('moment-timezone'),
  Schema = mongoose.Schema;

var getNow = function() {
  return moment.tz('UTC').format();
};

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Employee name',
    trim: true
  },
  lastname: {
    type: String,
    default: '',
    trim: true
  },
  salary: {
    type: Number,
    default: 0,
    min: 0
  },
  birthday: {
    type: String,
    default: getNow
  },
  created: {
    type: String,
    default: getNow
  },
  employeeImageURL: {
    type: String,
    default: 'modules/employees/client/img/employee/default.png'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Employee', EmployeeSchema);
