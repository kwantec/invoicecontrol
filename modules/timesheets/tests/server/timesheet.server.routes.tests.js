'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Timesheet = mongoose.model('Timesheet'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  timesheet;

/**
 * Timesheet routes tests
 */
describe('Timesheet CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Timesheet
    user.save(function () {
      timesheet = {
        name: 'Timesheet name'
      };

      done();
    });
  });

  it('should be able to save a Timesheet if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Timesheet
        agent.post('/api/timesheets')
          .send(timesheet)
          .expect(200)
          .end(function (timesheetSaveErr, timesheetSaveRes) {
            // Handle Timesheet save error
            if (timesheetSaveErr) {
              return done(timesheetSaveErr);
            }

            // Get a list of Timesheets
            agent.get('/api/timesheets')
              .end(function (timesheetsGetErr, timesheetsGetRes) {
                // Handle Timesheets save error
                if (timesheetsGetErr) {
                  return done(timesheetsGetErr);
                }

                // Get Timesheets list
                var timesheets = timesheetsGetRes.body;

                // Set assertions
                (timesheets[0].user._id).should.equal(userId);
                (timesheets[0].name).should.match('Timesheet name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Timesheet if not logged in', function (done) {
    agent.post('/api/timesheets')
      .send(timesheet)
      .expect(403)
      .end(function (timesheetSaveErr, timesheetSaveRes) {
        // Call the assertion callback
        done(timesheetSaveErr);
      });
  });

  it('should not be able to save an Timesheet if no name is provided', function (done) {
    // Invalidate name field
    timesheet.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Timesheet
        agent.post('/api/timesheets')
          .send(timesheet)
          .expect(400)
          .end(function (timesheetSaveErr, timesheetSaveRes) {
            // Set message assertion
            (timesheetSaveRes.body.message).should.match('Please fill Timesheet name');

            // Handle Timesheet save error
            done(timesheetSaveErr);
          });
      });
  });

  it('should be able to update an Timesheet if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Timesheet
        agent.post('/api/timesheets')
          .send(timesheet)
          .expect(200)
          .end(function (timesheetSaveErr, timesheetSaveRes) {
            // Handle Timesheet save error
            if (timesheetSaveErr) {
              return done(timesheetSaveErr);
            }

            // Update Timesheet name
            timesheet.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Timesheet
            agent.put('/api/timesheets/' + timesheetSaveRes.body._id)
              .send(timesheet)
              .expect(200)
              .end(function (timesheetUpdateErr, timesheetUpdateRes) {
                // Handle Timesheet update error
                if (timesheetUpdateErr) {
                  return done(timesheetUpdateErr);
                }

                // Set assertions
                (timesheetUpdateRes.body._id).should.equal(timesheetSaveRes.body._id);
                (timesheetUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Timesheets if not signed in', function (done) {
    // Create new Timesheet model instance
    var timesheetObj = new Timesheet(timesheet);

    // Save the timesheet
    timesheetObj.save(function () {
      // Request Timesheets
      request(app).get('/api/timesheets')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Timesheet if not signed in', function (done) {
    // Create new Timesheet model instance
    var timesheetObj = new Timesheet(timesheet);

    // Save the Timesheet
    timesheetObj.save(function () {
      request(app).get('/api/timesheets/' + timesheetObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', timesheet.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Timesheet with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/timesheets/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Timesheet is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Timesheet which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Timesheet
    request(app).get('/api/timesheets/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Timesheet with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Timesheet if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Timesheet
        agent.post('/api/timesheets')
          .send(timesheet)
          .expect(200)
          .end(function (timesheetSaveErr, timesheetSaveRes) {
            // Handle Timesheet save error
            if (timesheetSaveErr) {
              return done(timesheetSaveErr);
            }

            // Delete an existing Timesheet
            agent.delete('/api/timesheets/' + timesheetSaveRes.body._id)
              .send(timesheet)
              .expect(200)
              .end(function (timesheetDeleteErr, timesheetDeleteRes) {
                // Handle timesheet error error
                if (timesheetDeleteErr) {
                  return done(timesheetDeleteErr);
                }

                // Set assertions
                (timesheetDeleteRes.body._id).should.equal(timesheetSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Timesheet if not signed in', function (done) {
    // Set Timesheet user
    timesheet.user = user;

    // Create new Timesheet model instance
    var timesheetObj = new Timesheet(timesheet);

    // Save the Timesheet
    timesheetObj.save(function () {
      // Try deleting Timesheet
      request(app).delete('/api/timesheets/' + timesheetObj._id)
        .expect(403)
        .end(function (timesheetDeleteErr, timesheetDeleteRes) {
          // Set message assertion
          (timesheetDeleteRes.body.message).should.match('User is not authorized');

          // Handle Timesheet error error
          done(timesheetDeleteErr);
        });

    });
  });

  it('should be able to get a single Timesheet that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Timesheet
          agent.post('/api/timesheets')
            .send(timesheet)
            .expect(200)
            .end(function (timesheetSaveErr, timesheetSaveRes) {
              // Handle Timesheet save error
              if (timesheetSaveErr) {
                return done(timesheetSaveErr);
              }

              // Set assertions on new Timesheet
              (timesheetSaveRes.body.name).should.equal(timesheet.name);
              should.exist(timesheetSaveRes.body.user);
              should.equal(timesheetSaveRes.body.user._id, orphanId);

              // force the Timesheet to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Timesheet
                    agent.get('/api/timesheets/' + timesheetSaveRes.body._id)
                      .expect(200)
                      .end(function (timesheetInfoErr, timesheetInfoRes) {
                        // Handle Timesheet error
                        if (timesheetInfoErr) {
                          return done(timesheetInfoErr);
                        }

                        // Set assertions
                        (timesheetInfoRes.body._id).should.equal(timesheetSaveRes.body._id);
                        (timesheetInfoRes.body.name).should.equal(timesheet.name);
                        should.equal(timesheetInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Timesheet.remove().exec(done);
    });
  });
});
