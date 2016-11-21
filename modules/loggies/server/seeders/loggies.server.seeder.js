/**
 * Created by migdonio1 on 11/21/16.
 */
'use strict';

var mongoose = require('mongoose');
var faker = require('faker');

var Employee = mongoose.model('Employee');
var WorkTeam = mongoose.model('WorkTeam');
var Loggy = mongoose.model('Loggy');


/*
*  The function receive the number of loggies do you want to create with his respectives workteam and employee created
* */
// TODO: Fix "Segmentation fault (core dumped)" when executing the function
exports.seedMongo = function(id) {
    var employeeData = {
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            zipCode: faker.address.zipCode()
        },
        personEmail: faker.internet.email(),
        workEmail: faker.internet.email(),
        rfc: faker.random.uuid(),
        imss: faker.random.uuid(),
        curp: faker.random.uuid(),
        picture: faker.image.avatar(),
        user: id
    };

    var employee = new Employee(employeeData);
    employee.save(function(err, employeeCreated){
        if(err) {
            console.log(err);
        }else {
            var workTeamData = {
                name: faker.commerce.productName(),
                description: faker.lorem.paragraph(),
                leader: {
                    name: faker.name.findName(),
                    phone: faker.phone.phoneNumberFormat(),
                    office: faker.commerce.department(),
                    cellphone: faker.phone.phoneNumberFormat(),
                    email: faker.internet.email()
                },
                architect: {
                    name: faker.name.findName(),
                    phone: faker.phone.phoneNumberFormat(),
                    office: faker.commerce.department(),
                    cellphone: faker.phone.phoneNumberFormat(),
                    email: faker.internet.email()
                },
                technologies: [
                    faker.internet.domainName(),
                    faker.internet.domainName(),
                    faker.internet.domainName(),
                    faker.internet.domainName(),
                    faker.internet.domainName(),
                    faker.internet.domainName()
                ],
                employees: [
                    employeeCreated._id
                ]
            };

            var workTeam = new WorkTeam(workTeamData);

            workTeam.save(function (err, workTeamCreated) {
                if(err) {
                    console.log(err);
                } else {
                    var loggyData = {
                        activity: faker.hacker.phrase(),
                        employee: employeeCreated._id,
                        workTeam: workTeamCreated._id
                    };

                    var loggy = new Loggy(loggyData);
                    loggy.save(function (err, loggyCreated) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(loggyCreated);
                        }
                    });
                }
            });
        }
    });
};
