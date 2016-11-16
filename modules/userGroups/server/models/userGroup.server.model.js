'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Group Schema
 */
var UserGroupSchema = new Schema({
  name: {
    type: String,
    default: 'name...',
    required: 'Please fill Group name',
    trim: true
  },
  description: {
    type: String,
    default: 'description...',
    required: 'Please fill Group description',
  },
  permissions: [{
    module: {
      type: Schema.ObjectId,
      ref: 'Module'
    },
    permission: {
      type: Schema.ObjectId,
      ref: 'Permission'
    }
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

//TODO: agregar metodos de inyeccion de usuarios y obtener lista de permisos.
mongoose.model('UserGroup', UserGroupSchema);
