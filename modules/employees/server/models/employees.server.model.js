'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  momentTimezone = require("moment-timezone"),
  Schema = mongoose.Schema;

var getNow = function(){
  return momentTimezone.tz('UTC').format();
}
/**
 * Article Schema
 */
var EmployeeSchema = new Schema({
  created: {
    type: Date,
    default: getNow
  },
  name: {
    type: String,
    trim: true,
    default: 'Name'
  },
  lastname: {
    type: String,
    trim: true,
    default: 'Lastname'
  },
  dateOfBirthday: {
    type: Date,
    default: Date.now
  },
  salary: {
    type: Number
  }
  // team: {
  //   type: Schema.ObjectId,
  //   ref: 'Team'
  // }
});

mongoose.model('Employee', EmployeeSchema);
