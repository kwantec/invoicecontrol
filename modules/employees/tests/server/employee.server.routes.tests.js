'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Employee = mongoose.model('Employee'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  employee;

/**
 * Employee routes tests
 */
describe('Employee CRUD tests', function () {

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

    // Save a user to the test db and create new Employee
    user.save(function () {
      employee = {
        name: 'Employee name'
      };

      done();
    });
  });

  it('should be able to save a Employee if logged in', function (done) {
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

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Get a list of Employees
            agent.get('/api/employees')
              .end(function (employeesGetErr, employeesGetRes) {
                // Handle Employees save error
                if (employeesGetErr) {
                  return done(employeesGetErr);
                }

                // Get Employees list
                var employees = employeesGetRes.body;

                // Set assertions
                (employees[0].user._id).should.equal(userId);
                (employees[0].name).should.match('Employee name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Employee if not logged in', function (done) {
    agent.post('/api/employees')
      .send(employee)
      .expect(403)
      .end(function (employeeSaveErr, employeeSaveRes) {
        // Call the assertion callback
        done(employeeSaveErr);
      });
  });

  it('should not be able to save an Employee if no name is provided', function (done) {
    // Invalidate name field
    employee.name = '';

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

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(400)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Set message assertion
            (employeeSaveRes.body.message).should.match('Please fill Employee name');

            // Handle Employee save error
            done(employeeSaveErr);
          });
      });
  });

  it('should be able to update an Employee if signed in', function (done) {
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

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Update Employee name
            employee.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Employee
            agent.put('/api/employees/' + employeeSaveRes.body._id)
              .send(employee)
              .expect(200)
              .end(function (employeeUpdateErr, employeeUpdateRes) {
                // Handle Employee update error
                if (employeeUpdateErr) {
                  return done(employeeUpdateErr);
                }

                // Set assertions
                (employeeUpdateRes.body._id).should.equal(employeeSaveRes.body._id);
                (employeeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Employees if not signed in', function (done) {
    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the employee
    employeeObj.save(function () {
      // Request Employees
      request(app).get('/api/employees')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Employee if not signed in', function (done) {
    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the Employee
    employeeObj.save(function () {
      request(app).get('/api/employees/' + employeeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', employee.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Employee with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/employees/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Employee is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Employee which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Employee
    request(app).get('/api/employees/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Employee with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Employee if signed in', function (done) {
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

        // Save a new Employee
        agent.post('/api/employees')
          .send(employee)
          .expect(200)
          .end(function (employeeSaveErr, employeeSaveRes) {
            // Handle Employee save error
            if (employeeSaveErr) {
              return done(employeeSaveErr);
            }

            // Delete an existing Employee
            agent.delete('/api/employees/' + employeeSaveRes.body._id)
              .send(employee)
              .expect(200)
              .end(function (employeeDeleteErr, employeeDeleteRes) {
                // Handle employee error error
                if (employeeDeleteErr) {
                  return done(employeeDeleteErr);
                }

                // Set assertions
                (employeeDeleteRes.body._id).should.equal(employeeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Employee if not signed in', function (done) {
    // Set Employee user
    employee.user = user;

    // Create new Employee model instance
    var employeeObj = new Employee(employee);

    // Save the Employee
    employeeObj.save(function () {
      // Try deleting Employee
      request(app).delete('/api/employees/' + employeeObj._id)
        .expect(403)
        .end(function (employeeDeleteErr, employeeDeleteRes) {
          // Set message assertion
          (employeeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Employee error error
          done(employeeDeleteErr);
        });

    });
  });

  it('should be able to get a single Employee that has an orphaned user reference', function (done) {
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

          // Save a new Employee
          agent.post('/api/employees')
            .send(employee)
            .expect(200)
            .end(function (employeeSaveErr, employeeSaveRes) {
              // Handle Employee save error
              if (employeeSaveErr) {
                return done(employeeSaveErr);
              }

              // Set assertions on new Employee
              (employeeSaveRes.body.name).should.equal(employee.name);
              should.exist(employeeSaveRes.body.user);
              should.equal(employeeSaveRes.body.user._id, orphanId);

              // force the Employee to have an orphaned user reference
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

                    // Get the Employee
                    agent.get('/api/employees/' + employeeSaveRes.body._id)
                      .expect(200)
                      .end(function (employeeInfoErr, employeeInfoRes) {
                        // Handle Employee error
                        if (employeeInfoErr) {
                          return done(employeeInfoErr);
                        }

                        // Set assertions
                        (employeeInfoRes.body._id).should.equal(employeeSaveRes.body._id);
                        (employeeInfoRes.body.name).should.equal(employee.name);
                        should.equal(employeeInfoRes.body.user, undefined);

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
      Employee.remove().exec(done);
    });
  });
});
