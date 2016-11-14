/**
 * Created by Andre on 13/11/2016.
 */
'use strict';

var path = require('path');
var mongoose = require("mongoose");
var WorkTeam = mongoose.model("WorkTeam");
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
    var team = new WorkTeam(req.body);

    team.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(team);
        }

    });
};



exports.update = function (req, res) {
    var team = WorkTeam.findById(req.params.teamWorkId).exec(function (err, team) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!team) {
                return res.status(404).send({
                    message: "No se encontro el equipo de trabajo"
                });
            }

            team.name = req.body.name;
            team.description = req.body.description;
            team.leader = req.body.leader;
            team.architect = req.body.architect;
            team.technologies = req.body.technologies;

            team.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(team);
                }

            });


        }
    })
};


exports.list = function (req, res) {
    WorkTeam.find({deleteAt: null}, function (err, teams) {
        if (err) {
            console.log(err);
        } else {
            res.json(teams);
        }
    });
};

exports.read = function (req, res) {
    WorkTeam.find(req.params.teamWorkId, function (err, team) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!team) {
                return res.status(404).send({
                    message: "No se encontro el equipo de trabajo"
                });
            }

            res.json(team);
        }
    });
};

exports.delete = function (req, res) {
    WorkTeam.findById(req.params.teamWorkId).exec(function (err, team) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if (!team) {
                return res.status(404).send({
                    message: "No se encontro el equipo de trabajo"
                });
            }

            team.delete(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(team);
                }
            });
        }

    });
};
