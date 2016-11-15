'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Sign = mongoose.model('Sign'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  sign;

/**
 * Sign routes tests
 */
describe('Sign CRUD tests', function () {

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

    // Save a user to the test db and create new Sign
    user.save(function () {
      sign = {
        name: 'Sign name'
      };

      done();
    });
  });

  it('should be able to save a Sign if logged in', function (done) {
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

        // Save a new Sign
        agent.post('/api/signs')
          .send(sign)
          .expect(200)
          .end(function (signSaveErr, signSaveRes) {
            // Handle Sign save error
            if (signSaveErr) {
              return done(signSaveErr);
            }

            // Get a list of Signs
            agent.get('/api/signs')
              .end(function (signsGetErr, signsGetRes) {
                // Handle Signs save error
                if (signsGetErr) {
                  return done(signsGetErr);
                }

                // Get Signs list
                var signs = signsGetRes.body;

                // Set assertions
                (signs[0].user._id).should.equal(userId);
                (signs[0].name).should.match('Sign name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Sign if not logged in', function (done) {
    agent.post('/api/signs')
      .send(sign)
      .expect(403)
      .end(function (signSaveErr, signSaveRes) {
        // Call the assertion callback
        done(signSaveErr);
      });
  });

  it('should not be able to save an Sign if no name is provided', function (done) {
    // Invalidate name field
    sign.name = '';

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

        // Save a new Sign
        agent.post('/api/signs')
          .send(sign)
          .expect(400)
          .end(function (signSaveErr, signSaveRes) {
            // Set message assertion
            (signSaveRes.body.message).should.match('Please fill Sign name');

            // Handle Sign save error
            done(signSaveErr);
          });
      });
  });

  it('should be able to update an Sign if signed in', function (done) {
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

        // Save a new Sign
        agent.post('/api/signs')
          .send(sign)
          .expect(200)
          .end(function (signSaveErr, signSaveRes) {
            // Handle Sign save error
            if (signSaveErr) {
              return done(signSaveErr);
            }

            // Update Sign name
            sign.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Sign
            agent.put('/api/signs/' + signSaveRes.body._id)
              .send(sign)
              .expect(200)
              .end(function (signUpdateErr, signUpdateRes) {
                // Handle Sign update error
                if (signUpdateErr) {
                  return done(signUpdateErr);
                }

                // Set assertions
                (signUpdateRes.body._id).should.equal(signSaveRes.body._id);
                (signUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Signs if not signed in', function (done) {
    // Create new Sign model instance
    var signObj = new Sign(sign);

    // Save the sign
    signObj.save(function () {
      // Request Signs
      request(app).get('/api/signs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Sign if not signed in', function (done) {
    // Create new Sign model instance
    var signObj = new Sign(sign);

    // Save the Sign
    signObj.save(function () {
      request(app).get('/api/signs/' + signObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', sign.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Sign with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/signs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Sign is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Sign which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Sign
    request(app).get('/api/signs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Sign with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Sign if signed in', function (done) {
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

        // Save a new Sign
        agent.post('/api/signs')
          .send(sign)
          .expect(200)
          .end(function (signSaveErr, signSaveRes) {
            // Handle Sign save error
            if (signSaveErr) {
              return done(signSaveErr);
            }

            // Delete an existing Sign
            agent.delete('/api/signs/' + signSaveRes.body._id)
              .send(sign)
              .expect(200)
              .end(function (signDeleteErr, signDeleteRes) {
                // Handle sign error error
                if (signDeleteErr) {
                  return done(signDeleteErr);
                }

                // Set assertions
                (signDeleteRes.body._id).should.equal(signSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Sign if not signed in', function (done) {
    // Set Sign user
    sign.user = user;

    // Create new Sign model instance
    var signObj = new Sign(sign);

    // Save the Sign
    signObj.save(function () {
      // Try deleting Sign
      request(app).delete('/api/signs/' + signObj._id)
        .expect(403)
        .end(function (signDeleteErr, signDeleteRes) {
          // Set message assertion
          (signDeleteRes.body.message).should.match('User is not authorized');

          // Handle Sign error error
          done(signDeleteErr);
        });

    });
  });

  it('should be able to get a single Sign that has an orphaned user reference', function (done) {
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

          // Save a new Sign
          agent.post('/api/signs')
            .send(sign)
            .expect(200)
            .end(function (signSaveErr, signSaveRes) {
              // Handle Sign save error
              if (signSaveErr) {
                return done(signSaveErr);
              }

              // Set assertions on new Sign
              (signSaveRes.body.name).should.equal(sign.name);
              should.exist(signSaveRes.body.user);
              should.equal(signSaveRes.body.user._id, orphanId);

              // force the Sign to have an orphaned user reference
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

                    // Get the Sign
                    agent.get('/api/signs/' + signSaveRes.body._id)
                      .expect(200)
                      .end(function (signInfoErr, signInfoRes) {
                        // Handle Sign error
                        if (signInfoErr) {
                          return done(signInfoErr);
                        }

                        // Set assertions
                        (signInfoRes.body._id).should.equal(signSaveRes.body._id);
                        (signInfoRes.body.name).should.equal(sign.name);
                        should.equal(signInfoRes.body.user, undefined);

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
      Sign.remove().exec(done);
    });
  });
});
