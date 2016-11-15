'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * StaffBilling Schema
 */
var StaffBillingSchema = new Schema({
  team:{
  	type: Schema.ObjectId,
    ref: 'Team'
  },
  periodStart:{
  	type: Date,
  	default: Date.now
  },
  periodEnd:{
  	type: Date,
  	default: Date.now
  },
  totalDaysPeriod:{
  	type: Number,
  	default: '',
    trim: true
  },
  totalDaysMonth:{
  	type: Number,
  	default: '',
    trim: true
  },
  staffBilling:[{
  	firstName: String,
  	lastName: String,
  	rate: Number,
  	daysWorked: Number,
  	vacationDays: Number,
  	cargesWithoutDicount: Number,
  	dicount: Number,
  	cargeswithDiscount: Number
  }],
  totalChargesNoDiscount:{
  	type: Number,
  	default: ''
  },
  totalDicount:{
  	type: Number,
  	default: ''
  },
  totalCargesDiscount:{
  	type: Number,
  	default: ''
  },
  paymentDue:{
  	type: Date,
  	default: Date.now
  },
  dueOn:{
  	type: Date,
  	default: Date.now
  }
});

mongoose.model('StaffBilling', StaffBillingSchema);
