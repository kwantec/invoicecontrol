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
 * Timesheet Schema
 */
var TimesheetSchema = new Schema({
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  startDate: {
    type: Date,
    default: getNow
  },
  finishDate: {
    type: Date,
    default: getNow
  },
  logs: [{
    type: Schema.ObjectId,
    ref: 'Loggy'
  }],
  employees: [{
      type: Schema.ObjectId,
      ref: 'Employee'
    },{
      billing: {
        level: {
          type: String,
          default: '',
          trim: true
        },
        monthly: {
          type: String,
          default: '',
          trim: true
        },
        daysWorked: {
          type: Number,
          default: 0
        },
        vacationSickDays: {
          type: Number,
          default: 0
        },
        currentPeriodCharges: {
          type: Number,
          default: 0.00
        },
        discount: {
          type: Number,
          default: 0.00
        },
        totalPeriodCharges: {
          type: Number,
          default: 0.00
        }
      }
    }
  ],
  created_at: {
    type: Date,
    default: getNow
  }
});

mongoose.model('Timesheet', TimesheetSchema);