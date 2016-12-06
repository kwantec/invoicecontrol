/**
 * Created by Andre on 13/11/2016.
 */
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email"];

var clientSchema = new Schema({
        name: String,
        contact: {
            name: String,
            officePhone: String,
            cellPhone: String,
            email: String
        },
        address: {
            city: String,
            state: String,
            country: String,
            zipCode: String,
            street: String,
            colony: String,
            lot: String,
            crosses: String
        },
        taxId: String,
        phone: String,
        email: {type: String, required: "Write your email", match: email_match},
        url: String,
        workTeams: [{type: mongoose.Schema.Types.ObjectId, ref: 'WorkTeam'}]
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at'}
    });

clientSchema.plugin(mongoose_delete,{ deletedAt : true });
mongoose.model("Client", clientSchema);