'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Invoice = mongoose.model('Invoice'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  invoice;

/**
 * Invoice routes tests
 */
describe('Invoice CRUD tests', function () {

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

    // Save a user to the test db and create new Invoice
    user.save(function () {
      invoice = {
        name: 'Invoice name'
      };

      done();
    });
  });

  it('should be able to save a Invoice if logged in', function (done) {
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

        // Save a new Invoice
        agent.post('/api/invoices')
          .send(invoice)
          .expect(200)
          .end(function (invoiceSaveErr, invoiceSaveRes) {
            // Handle Invoice save error
            if (invoiceSaveErr) {
              return done(invoiceSaveErr);
            }

            // Get a list of Invoices
            agent.get('/api/invoices')
              .end(function (invoicesGetErr, invoicesGetRes) {
                // Handle Invoices save error
                if (invoicesGetErr) {
                  return done(invoicesGetErr);
                }

                // Get Invoices list
                var invoices = invoicesGetRes.body;

                // Set assertions
                (invoices[0].user._id).should.equal(userId);
                (invoices[0].name).should.match('Invoice name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Invoice if not logged in', function (done) {
    agent.post('/api/invoices')
      .send(invoice)
      .expect(403)
      .end(function (invoiceSaveErr, invoiceSaveRes) {
        // Call the assertion callback
        done(invoiceSaveErr);
      });
  });

  it('should not be able to save an Invoice if no name is provided', function (done) {
    // Invalidate name field
    invoice.name = '';

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

        // Save a new Invoice
        agent.post('/api/invoices')
          .send(invoice)
          .expect(400)
          .end(function (invoiceSaveErr, invoiceSaveRes) {
            // Set message assertion
            (invoiceSaveRes.body.message).should.match('Please fill Invoice name');

            // Handle Invoice save error
            done(invoiceSaveErr);
          });
      });
  });

  it('should be able to update an Invoice if signed in', function (done) {
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

        // Save a new Invoice
        agent.post('/api/invoices')
          .send(invoice)
          .expect(200)
          .end(function (invoiceSaveErr, invoiceSaveRes) {
            // Handle Invoice save error
            if (invoiceSaveErr) {
              return done(invoiceSaveErr);
            }

            // Update Invoice name
            invoice.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Invoice
            agent.put('/api/invoices/' + invoiceSaveRes.body._id)
              .send(invoice)
              .expect(200)
              .end(function (invoiceUpdateErr, invoiceUpdateRes) {
                // Handle Invoice update error
                if (invoiceUpdateErr) {
                  return done(invoiceUpdateErr);
                }

                // Set assertions
                (invoiceUpdateRes.body._id).should.equal(invoiceSaveRes.body._id);
                (invoiceUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Invoices if not signed in', function (done) {
    // Create new Invoice model instance
    var invoiceObj = new Invoice(invoice);

    // Save the invoice
    invoiceObj.save(function () {
      // Request Invoices
      request(app).get('/api/invoices')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Invoice if not signed in', function (done) {
    // Create new Invoice model instance
    var invoiceObj = new Invoice(invoice);

    // Save the Invoice
    invoiceObj.save(function () {
      request(app).get('/api/invoices/' + invoiceObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', invoice.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Invoice with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/invoices/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Invoice is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Invoice which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Invoice
    request(app).get('/api/invoices/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Invoice with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Invoice if signed in', function (done) {
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

        // Save a new Invoice
        agent.post('/api/invoices')
          .send(invoice)
          .expect(200)
          .end(function (invoiceSaveErr, invoiceSaveRes) {
            // Handle Invoice save error
            if (invoiceSaveErr) {
              return done(invoiceSaveErr);
            }

            // Delete an existing Invoice
            agent.delete('/api/invoices/' + invoiceSaveRes.body._id)
              .send(invoice)
              .expect(200)
              .end(function (invoiceDeleteErr, invoiceDeleteRes) {
                // Handle invoice error error
                if (invoiceDeleteErr) {
                  return done(invoiceDeleteErr);
                }

                // Set assertions
                (invoiceDeleteRes.body._id).should.equal(invoiceSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Invoice if not signed in', function (done) {
    // Set Invoice user
    invoice.user = user;

    // Create new Invoice model instance
    var invoiceObj = new Invoice(invoice);

    // Save the Invoice
    invoiceObj.save(function () {
      // Try deleting Invoice
      request(app).delete('/api/invoices/' + invoiceObj._id)
        .expect(403)
        .end(function (invoiceDeleteErr, invoiceDeleteRes) {
          // Set message assertion
          (invoiceDeleteRes.body.message).should.match('User is not authorized');

          // Handle Invoice error error
          done(invoiceDeleteErr);
        });

    });
  });

  it('should be able to get a single Invoice that has an orphaned user reference', function (done) {
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

          // Save a new Invoice
          agent.post('/api/invoices')
            .send(invoice)
            .expect(200)
            .end(function (invoiceSaveErr, invoiceSaveRes) {
              // Handle Invoice save error
              if (invoiceSaveErr) {
                return done(invoiceSaveErr);
              }

              // Set assertions on new Invoice
              (invoiceSaveRes.body.name).should.equal(invoice.name);
              should.exist(invoiceSaveRes.body.user);
              should.equal(invoiceSaveRes.body.user._id, orphanId);

              // force the Invoice to have an orphaned user reference
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

                    // Get the Invoice
                    agent.get('/api/invoices/' + invoiceSaveRes.body._id)
                      .expect(200)
                      .end(function (invoiceInfoErr, invoiceInfoRes) {
                        // Handle Invoice error
                        if (invoiceInfoErr) {
                          return done(invoiceInfoErr);
                        }

                        // Set assertions
                        (invoiceInfoRes.body._id).should.equal(invoiceSaveRes.body._id);
                        (invoiceInfoRes.body.name).should.equal(invoice.name);
                        should.equal(invoiceInfoRes.body.user, undefined);

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
      Invoice.remove().exec(done);
    });
  });
});
