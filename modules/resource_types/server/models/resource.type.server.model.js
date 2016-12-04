/**
 * Created by Andre on 13/11/2016.
 */
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;

var resourceTypeSchema = new Schema({
        name: String,
        rates: {
            level: Number,
            name: String,
            description: String,
            qualities: [String],
            rate: Number
        },
        family: String
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
);
resourceTypeSchema.plugin(mongoose_delete, {deletedAt: true});
mongoose.model("ResourceType", resourceTypeSchema);