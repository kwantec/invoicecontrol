/**
 * Created by Andre on 04/10/2016.
 */
'use strict';
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
        name: String,
        lastName: String,
        address : {
            city: String,
            state:String,
            country:String,
            zipCode:String
        },
        personEmail:String,
        workEmail:String,
        rfc: String,
        imss: String,
        curp: String,
        picture: String,
        user:{type:Schema.Types.ObjectId, ref:'User'},
        resourceType:{type:Schema.Types.ObjectId, ref:'ResourceType'}
    },
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at' }
    });

employeeSchema.plugin(mongoose_delete,{ deletedAt : true });
mongoose.model("Employee", employeeSchema);



