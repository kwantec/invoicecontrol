/**
 * Created by Izanami on 10/11/2016.
 * Modified by BuiRai on 13/11/2016.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ModuleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: 'Please fill in a name'
  },
  description: {
    type: String,
    required: 'Please fill in a description'
  },
  permissions: [{
    permissionId: {
      type: Schema.ObjectId,
      ref: 'Permission'
    }
  }]
});

mongoose.model('Module', ModuleSchema);
