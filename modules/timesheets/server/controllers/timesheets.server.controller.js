'use strict';
/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Timesheet = mongoose.model('Timesheet'),
  Loggy = mongoose.model('Loggy'),
  WorkTeam = mongoose.model('WorkTeam'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');
const util = require('util');


/**
 * Create a Timesheet
 */
exports.create = function(req, res) {
  var timesheet = {};
  var workTeamLength = 0;
  var workTeamLeaderLength = 0;

  console.log(req.body);
  Loggy.find({
    "created": {
      "$gte": req.body.startDate,
      "$lte": req.body.finishDate
    },
    "workTeam" : req.body.team
  }).populate({
    path : 'employee',
    model: 'Employee'
  })
      .exec(function(err, loggiesSearched) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log("loggies ", loggiesSearched);

      WorkTeam.findById(req.body.team)
          .populate({
            path: 'employees',
            model: 'Employee'
          })
          .populate({
            path: 'employeeLeader',
            model: 'Employee'
          })
          .exec(function(err, workTeamSearched){
            workTeamLength = workTeamSearched.employees ? workTeamSearched.employees.length : 0;
            workTeamLeaderLength = workTeamSearched.employeeLeader ? workTeamSearched.employeeLeader.length : 0;

            initTimesheet();
            loggiesSearched.forEach(function(loggy, i, loggies){
              var dateTemp = new Date(loggy.created);
              var loggieDate = new Date(dateTemp.getFullYear(),dateTemp.getMonth(), dateTemp.getDate());

              /*console.log(loggieDate);*/

              timesheet.dayLogs.forEach(function(dayLog, j, dayLogs){
                /*console.log(dayLog.date.getTime() + "¿==? " +loggieDate.getTime());*/
                if(dayLog.date.getTime() == loggieDate.getTime()) {
                  /*console.log("aiuda 2", loggy.employee.name);*/
                  dayLog.employeesLogsDay.forEach(function(employeeLogDay, k, employeesLogsDay){
                    /*console.log("aiuda 3", loggy.employee.name);
                    console.log("aiuda 4", employeeLogDay.name.firstName);*/
                    if(employeeLogDay.name.firsName == loggy.employee.name){
                      /*console.log("aiuda 5", employeeLogDay);*/
                      employeeLogDay.activity = loggy.activity;
                      /*console.log("aiuda 6",employeeLogDay);*/
                    }
                  });
                }
              });
            });
            console.log("Json final ",util.inspect(timesheet, false, null))

            var newTimesheet = new Timesheet(timesheet);

            newTimesheet.save(function(err) {
             if (err) {
               return res.status(400).send({
                 message: errorHandler.getErrorMessage(err)
               });
             } else {
               res.jsonp(timesheet);
             }
            });

            function initTimesheet(){
              timesheet = {
                name: req.body.name,
                team: req.body.team,
                startDate: req.body.startDate,
                finishDate: req.body.finishDate,
                workDaysInPeriod: 10,
                workDaysInMonth: 25,
                dayLogs: [],
                employees: []
              };


              var startDate = new Date(timesheet.startDate);
              var finishDate = new Date(timesheet.finishDate);

              var dayLog = {};
              var employeeLogDay = {};
              var employeeData = {};

              var timeDiff = Math.abs(startDate.getTime() - finishDate.getTime());
              var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; //diffDays return diff - 1, FIX: +1 day

              for(var i=0; i< diffDays; i++) {
                var dayDate;
                if(i==0){
                  dayDate = new Date(startDate.setDate(startDate.getDate()));
                }else{
                  dayDate = new Date(startDate.setDate(startDate.getDate() + 1));
                }

                dayLog = {
                  date: dayDate,
                  employeesLogsDay: []
                };

                for(var j=0; j < workTeamLength; j++) {
                  employeeLogDay = {
                    name: {
                      firsName: workTeamSearched.employees[j].name,
                      lastName: workTeamSearched.employees[j].lastName
                    },
                    activity: ""
                  };
                  dayLog.employeesLogsDay.push(employeeLogDay);
                }
                if(workTeamSearched.employeeLeader){
                  employeeLogDay = {
                    name: {
                      firsName: workTeamSearched.employeeLeader.name,
                      lastName: workTeamSearched.employeeLeader.lastName
                    },
                    activity: ""
                  };
                  dayLog.employeesLogsDay.push(employeeLogDay);
                }

                timesheet.dayLogs.push(dayLog);

              }

              for(j=0; j < workTeamLength; j++) {
                employeeData = {
                  employee: workTeamSearched.employees[j]._id,
                  billing: {
                    level: "",
                    monthly: 0,
                    daysWorked: 0,
                    vacationSickDays: 0,
                    currentPeriodCharges: 0,
                    discount: 0,
                    totalPeriodCharges: 0
                  }
                };

                timesheet.employees.push(employeeData);
              }
              if(workTeamSearched.employeeLeader) {
                employeeData = {
                  employee: workTeamSearched.employeeLeader._id,
                  billing: {
                    level: "",
                    monthly: 0,
                    daysWorked: 0,
                    vacationSickDays: 0,
                    currentPeriodCharges: 0,
                    discount: 0,
                    totalPeriodCharges: 0
                  }
                };
                timesheet.employees.push(employeeData);
              }
            }
          });
    }
  });
};

/**
 * Show the current Timesheet
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var timesheet = req.timesheet ? req.timesheet.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  timesheet.isCurrentUserOwner = req.user && timesheet.user && timesheet.user._id.toString() === req.user._id.toString();

  res.jsonp(timesheet);
};

/**
 * Update a Timesheet
 */
exports.update = function(req, res) {
  var timesheet = req.timesheet;

  timesheet = _.extend(timesheet, req.body);

  timesheet.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheet);
    }
  });
};

/**
 * Delete an Timesheet
 */
exports.delete = function(req, res) {
  var timesheet = req.timesheet;

  timesheet.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheet);
    }
  });
};

/**
 * List of Timesheets
 */
exports.list = function(req, res) {
  Timesheet.find().sort('-created').populate('user', 'displayName').exec(function(err, timesheets) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(timesheets);
    }
  });
};

/**
 * Timesheet middleware
 */
exports.timesheetByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Timesheet is invalid'
    });
  }

  Timesheet.findById(id).populate('user', 'displayName').exec(function (err, timesheet) {
    if (err) {
      return next(err);
    } else if (!timesheet) {
      return res.status(404).send({
        message: 'No Timesheet with that identifier has been found'
      });
    }
    req.timesheet = timesheet;
    next();
  });
};
