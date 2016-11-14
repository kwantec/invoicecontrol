/**
 * Created by Andre on 13/11/2016.
 */
'use strict';
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

var purchaseOrderSchema = new Schema({
        purchaseNumber: String,
        name: String,
        description: String,
        assignedAmount: Number,
        remainingAmount: Number
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    });

purchaseOrderSchema.plugin(mongoose_delete, {deletedAt: true});
mongoose.model("PurchaseOrder", purchaseOrderSchema);