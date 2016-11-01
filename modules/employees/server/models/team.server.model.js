/**
 * Created by Andre on 04/10/2016.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("Team", teamSchema);
