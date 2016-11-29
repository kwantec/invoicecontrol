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
  daysPeriod: {
    type: Number,
    default: '',
    required: 'Please fill Invoice work days period',
    trim: true
  },
  daysMonth: {
    type: Number,
    default: '',
    required: 'Please fill Invoice work days month',
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

mongoose.model('Invoice', InvoiceSchema);
