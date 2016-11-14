/**
 * Created by Andre on 13/11/2016.
 */
var mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');
var Schema = mongoose.Schema;
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email"];

var workTeamSchema = new Schema({
        name: String,
        description: String,
        leader: {
            name:String,
            phone:String,
            office:String,
            cellphone:String,
            email: {type: String, required: "Write your email", match: email_match}
        },
        architect : {
            name:String,
            phone:String,
            office:String,
            cellphone:String,
            email: {type: String, required: "Write your email", match: email_match}
        },
        technologies: [String],
        employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
        employeeLeader: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}

    },
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at' } }
);
workTeamSchema.plugin(mongoose_delete,{ deletedAt : true });
mongoose.model("WorkTeam", workTeamSchema);