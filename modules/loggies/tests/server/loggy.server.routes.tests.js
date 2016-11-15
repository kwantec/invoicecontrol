'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Loggy = mongoose.model('Loggy'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  loggy;

/**
 * Loggy routes tests
 */
describe('Loggy CRUD tests', function () {

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

    // Save a user to the test db and create new Loggy
    user.save(function () {
      loggy = {
        name: 'Loggy name'
      };

      done();
    });
  });

  it('should be able to save a Loggy if logged in', function (done) {
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

        // Save a new Loggy
        agent.post('/api/loggies')
          .send(loggy)
          .expect(200)
          .end(function (loggySaveErr, loggySaveRes) {
            // Handle Loggy save error
            if (loggySaveErr) {
              return done(loggySaveErr);
            }

            // Get a list of Loggies
            agent.get('/api/loggies')
              .end(function (loggiesGetErr, loggiesGetRes) {
                // Handle Loggies save error
                if (loggiesGetErr) {
                  return done(loggiesGetErr);
                }

                // Get Loggies list
                var loggies = loggiesGetRes.body;

                // Set assertions
                (loggies[0].user._id).should.equal(userId);
                (loggies[0].name).should.match('Loggy name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Loggy if not logged in', function (done) {
    agent.post('/api/loggies')
      .send(loggy)
      .expect(403)
      .end(function (loggySaveErr, loggySaveRes) {
        // Call the assertion callback
        done(loggySaveErr);
      });
  });

  it('should not be able to save an Loggy if no name is provided', function (done) {
    // Invalidate name field
    loggy.name = '';

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

        // Save a new Loggy
        agent.post('/api/loggies')
          .send(loggy)
          .expect(400)
          .end(function (loggySaveErr, loggySaveRes) {
            // Set message assertion
            (loggySaveRes.body.message).should.match('Please fill Loggy name');

            // Handle Loggy save error
            done(loggySaveErr);
          });
      });
  });

  it('should be able to update an Loggy if signed in', function (done) {
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

        // Save a new Loggy
        agent.post('/api/loggies')
          .send(loggy)
          .expect(200)
          .end(function (loggySaveErr, loggySaveRes) {
            // Handle Loggy save error
            if (loggySaveErr) {
              return done(loggySaveErr);
            }

            // Update Loggy name
            loggy.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Loggy
            agent.put('/api/loggies/' + loggySaveRes.body._id)
              .send(loggy)
              .expect(200)
              .end(function (loggyUpdateErr, loggyUpdateRes) {
                // Handle Loggy update error
                if (loggyUpdateErr) {
                  return done(loggyUpdateErr);
                }

                // Set assertions
                (loggyUpdateRes.body._id).should.equal(loggySaveRes.body._id);
                (loggyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Loggies if not signed in', function (done) {
    // Create new Loggy model instance
    var loggyObj = new Loggy(loggy);

    // Save the loggy
    loggyObj.save(function () {
      // Request Loggies
      request(app).get('/api/loggies')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Loggy if not signed in', function (done) {
    // Create new Loggy model instance
    var loggyObj = new Loggy(loggy);

    // Save the Loggy
    loggyObj.save(function () {
      request(app).get('/api/loggies/' + loggyObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', loggy.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Loggy with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/loggies/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Loggy is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Loggy which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Loggy
    request(app).get('/api/loggies/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Loggy with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Loggy if signed in', function (done) {
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

        // Save a new Loggy
        agent.post('/api/loggies')
          .send(loggy)
          .expect(200)
          .end(function (loggySaveErr, loggySaveRes) {
            // Handle Loggy save error
            if (loggySaveErr) {
              return done(loggySaveErr);
            }

            // Delete an existing Loggy
            agent.delete('/api/loggies/' + loggySaveRes.body._id)
              .send(loggy)
              .expect(200)
              .end(function (loggyDeleteErr, loggyDeleteRes) {
                // Handle loggy error error
                if (loggyDeleteErr) {
                  return done(loggyDeleteErr);
                }

                // Set assertions
                (loggyDeleteRes.body._id).should.equal(loggySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Loggy if not signed in', function (done) {
    // Set Loggy user
    loggy.user = user;

    // Create new Loggy model instance
    var loggyObj = new Loggy(loggy);

    // Save the Loggy
    loggyObj.save(function () {
      // Try deleting Loggy
      request(app).delete('/api/loggies/' + loggyObj._id)
        .expect(403)
        .end(function (loggyDeleteErr, loggyDeleteRes) {
          // Set message assertion
          (loggyDeleteRes.body.message).should.match('User is not authorized');

          // Handle Loggy error error
          done(loggyDeleteErr);
        });

    });
  });

  it('should be able to get a single Loggy that has an orphaned user reference', function (done) {
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

          // Save a new Loggy
          agent.post('/api/loggies')
            .send(loggy)
            .expect(200)
            .end(function (loggySaveErr, loggySaveRes) {
              // Handle Loggy save error
              if (loggySaveErr) {
                return done(loggySaveErr);
              }

              // Set assertions on new Loggy
              (loggySaveRes.body.name).should.equal(loggy.name);
              should.exist(loggySaveRes.body.user);
              should.equal(loggySaveRes.body.user._id, orphanId);

              // force the Loggy to have an orphaned user reference
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

                    // Get the Loggy
                    agent.get('/api/loggies/' + loggySaveRes.body._id)
                      .expect(200)
                      .end(function (loggyInfoErr, loggyInfoRes) {
                        // Handle Loggy error
                        if (loggyInfoErr) {
                          return done(loggyInfoErr);
                        }

                        // Set assertions
                        (loggyInfoRes.body._id).should.equal(loggySaveRes.body._id);
                        (loggyInfoRes.body.name).should.equal(loggy.name);
                        should.equal(loggyInfoRes.body.user, undefined);

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
      Loggy.remove().exec(done);
    });
  });
});
