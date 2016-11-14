/**
 * Created by Andre on 13/11/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workTeamSchema = new Schema({
        name: String,
        description: String,
        leader: {
            name:String,
            phone:String,
            office:String,
            cellphone:String,
            email:String
        },
        architect : {
            name:String,
            phone:String,
            office:String,
            cellphone:String,
            email:String
        },
        technologies: [String],
        employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}],
        employeeLeader: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}

    },
    { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at', deleteAt: 'delete_at' } }
);

mongoose.model("WorkTeam", workTeamSchema);