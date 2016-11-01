/**
 * Created by Andre on 04/10/2016.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var moment = require("moment-timezone");
var getNow = function()
{
    return moment.tz('UTC').format();
};


var employeeSchema = new Schema({
    name: String,
    lastName: String,
    salary: Number,
    dob: {type: Date, default: new Date().toUTCString()},
    team: {type: Schema.Types.ObjectId, ref: "team.server.model"},
    created: {
        type: Date,
        default: getNow
    }

});

mongoose.model("Employee", employeeSchema);



