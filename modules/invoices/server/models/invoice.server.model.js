'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
  number: {
    type: Number,
    default: '',
    required: 'Please fill Invoice number',
    trim: true
  },
  date: {
    type: Date,
    default: '',
    required: 'Please fill Invoice date',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill Invoice address',
    trim: true
  },
  purchaseOrder: {
    type: String,
    default: '',
    required: 'Please fill Invoice Purchase Order',
    trim: true
  },
  invoiceFor: {
    type: String,
    default: '',
    required: 'Please fill Invoice For',
    trim: true
  },
  teamName: {
    type: Schema.ObjectId,
    ref: 'WorkTeam'
  },
  workDaysInPeriod: {
    type: Number,
    default: '',
    required: 'Please fill Invoice work days period',
    trim: true
  },
  workDaysInMonth: {
    type: Number,
    default: '',
    required: 'Please fill Invoice work days month',
    trim: true
  },
  startDate: {
    type: Date,
    default: '',
    required: 'Please fill Invoice date',
    trim: true
  },
  finishDate: {
    type: Date,
    default: '',
    required: 'Please fill Invoice date',
    trim: true
  },
  employees: [{
    employee: {
      type: Schema.ObjectId,
      ref: 'Employee'
    },
    billing: {
      level: {
        type: String,
        default: '',
        trim: true
      },
      monthly: {
        type: Number,
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
  }],
  totalChargesNoDiscount:{
    type: Number,
    default: 0.00
  },
  totalDiscount:{
    type: Number,
    default: 0.00
  },
  totalChargesDiscount:{
    type: Number,
    default: 0.00
  },
  paymentDue:{
    type: Date,
    default: Date.now
  },
  dueOn:{
    type: Date,
    default: Date.now
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

mongoose.model('Invoice', InvoiceSchema);
