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
  	type: date,
  	default: Date.now
  },
  periodEnd:{
  	type: date,
  	default: Date.now
  },
  totalDaysPeriod:{
  	type: number,
  	default: '',
    trim: true
  },
  totalDaysMonth:{
  	type: number,
  	default: '',
    trim: true
  },
  staffBilling:{[
  	firstName:string,
  	lastName:string,
  	rate:number,
  	daysWorked:number,
  	vacationDays:number,
  	cargesWithoutDicount:number,
  	dicount:number,
  	cargeswithDiscount:number
  ]},
  totalChargesNoDiscount:{
  	type: number,
  	default: ''
  },
  totalDicount:{
  	type: number,
  	default: ''
  }
  totalCargesDiscount:{
  	type: number,
  	default: ''
  },
  paymentDue:{
  	type: date,
  	default: Date.now
  },
  dueOn:{
  	type: date,
  	default: Date.now
  }
});

mongoose.model('StaffBilling', StaffBillingSchema);
