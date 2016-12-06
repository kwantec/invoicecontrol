(function () {
  'use strict';

  // Timesheets controller
  angular
    .module('timesheets')
    .controller('TimesheetsController', TimesheetsController);

  TimesheetsController.$inject = ['$scope', '$state', '$resource', '$window', 'Authentication', 'timesheetResolve', '$mdToast', '$mdDialog', 'Employees', '$stateParams', 'TimesheetsService', 'LoggiesService'];

  function TimesheetsController ($scope, $state, $resource,$window, Authentication, timesheet, $mdToast, $mdDialog, Employees, $stateParams, TimesheetsService, LoggiesService) {

    var vm = this;
    var Timesheet = $resource('/api/timesheets');

    $scope.newTimesheet = {};
    $scope.newTimesheet.name = "";
    $scope.newTimesheet.startDate = "";
    $scope.newTimesheet.finishDate = "";
    $scope.newTimesheet.teamName = "";

    $scope.employees = Employees.query();

    vm.authentication = Authentication;
    vm.timesheet = timesheet;
    //vm.timesheet = getTimesheetMock();
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    if($stateParams.timesheetId){
      //$scope.timesheet = vm.timesheet;
      //$scope.timesheet = getTimesheetMock();
      findOne();
      $scope.totalPeriodCharges = 0;
      $scope.currentPeriodCharges = 0;
      $scope.discount = 0;
    }

    function getTimesheetMock(){
      return {
        _id: "583b266a41afddb2122415c1",
        team: {
          name: 'FERROS'
        },
        startDate: '1/12/2016',
        finishDate: '30/12/2016',
        workDaysInPeriod: 3,
        workDaysInMonth: 3,
        dayLogs: [{
          date: "12/12/2016",
          employeesLogsDay: [{
            name: {
              firstName: 'Migui',
              lastName: 'Rodriguez'
            },
            activity: "Actividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de Migui"
          }, {
            name: {
              firstName: 'Rob',
              lastName: 'Franco'
            },
            activity: "Actividad de Rob"
          }, {
            name: {
              firstName: 'Walter',
              lastName: 'Mendez'
            },
            activity: "Actividad de Walter"
          }]
        },
          {
            date: "12/12/2016",
            employeesLogsDay: [{
              name: {
                firstName: 'Migui',
                lastName: 'Rodriguez'
              },
              activity: "Actividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de Migui"
            }, {
              name: {
                firstName: 'Rob',
                lastName: 'Franco'
              },
              activity: "Actividad de Rob"
            }, {
              name: {
                firstName: 'Walter',
                lastName: 'Mendez'
              },
              activity: "Actividad de Walter"
            }]
          },
          {
            date: "12/12/2016",
            employeesLogsDay: [{
              name: {
                firstName: 'Migui',
                lastName: 'Rodriguez'
              },
              activity: "Actividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de Migui"
            }, {
              name: {
                firstName: 'Rob',
                lastName: 'Franco'
              },
              activity: "Actividad de Rob"
            }, {
              name: {
                firstName: 'Walter',
                lastName: 'Mendez'
              },
              activity: "Actividad de Walter"
            }]
          }],
        employees: [{
          employee: {
            name: 'Migui',
            lastName: 'Rodriguez'
          },
          billing: {
            level: 'intermediate',
            monthly: 10000,
            daysWorked: 15,
            vacationSickDays: 1,
            currentPeriodCharges: 0.00,
            discount: 0.00,
            totalPeriodCharges: 0.00
          }
        },
        {
          employee: {
            name: 'Rob',
            lastName: 'Franco'
          },
          billing: {
            level: 'intermediate',
            monthly: 10000,
            daysWorked: 15,
            vacationSickDays: 1,
            currentPeriodCharges: 0.00,
            discount: 0.00,
            totalPeriodCharges: 0.00
          }
        },
        {
          employee: {
            name: 'Walter',
            lastName: 'Mendez'
          },
          billing: {
            level: 'intermediate',
            monthly: 10000,
            daysWorked: 15,
            vacationSickDays: 1,
            currentPeriodCharges: 0.00,
            discount: 0.00,
            totalPeriodCharges: 0.00
          }
        }]
      };
    }

    function findOne() {
        TimesheetsService.get(
            {timesheetId: $stateParams.timesheetId},
            function (timesheet) {
                timesheet.employees = [];
                $scope.timesheet = timesheet;
                console.log("timesheet", $scope.timesheet);
                calculateTotals();
            },
            function (errorResponse) {
                $scope.error = errorResponse.data.message;
            }
        );
    };

    $scope.addTimesheet = function () {
      console.log($scope.newTimesheet);
      Timesheet.save($scope.newTimesheet, function () {
        $scope.newTimesheet = {};
        $scope.newTimesheet.name = "";
        $scope.newTimesheet.startDate = "";
        $scope.newTimesheet.finishDate = "";
        $scope.newTimesheet.teamName = "";
        $scope.showToastSave();
        console.log("Timesheet saved");
      });
    };

    $scope.showToastSave = function () {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Timesheet Created!')
              .hideDelay(3000)
      );
    };

    // Remove existing Timesheet
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.timesheet.$remove($state.go('timesheets.list'));
      }
    }

    // Save Timesheet
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.timesheetForm');
        return false;
      }
      vm.timesheet = $scope.timesheet;
      // TODO: move create/update logic to service
      if (vm.timesheet._id) {
        vm.timesheet.$update(successCallback, errorCallback);
      } else {
        vm.timesheet.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('timesheets.view', {
          timesheetId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    $scope.update = function () {
        var Updatedtimesheet = $scope.timesheet;
        Updatedtimesheet.$update(function () {
            console.log("timesheet actualizada");
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
            console.log(errorResponse);
        });
    };

    $scope.showDialog = function($event) {
       
       console.log("emp", $scope.employees);
       var parentEl = angular.element(document.body);
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         templateUrl: 'modules/timesheets/client/views/modal-addemployee.client.view.html',
         locals: {
           employees: $scope.employees
         },
         controller: DialogController
      });
      function DialogController($scope, $mdDialog, employees) {
        $scope.employees = employees;
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }

        $scope.selectedEmployee = function(_id) {
          $scope.closeDialog();
          addEmployee(_id);
        }
      }
    }

    function calculateTotals(){
      for(var index=0; index<$scope.timesheet.employees.length; index++){
        $scope.timesheet.employees[index].billing.totalPeriodCharges =
          $scope.timesheet.employees[index].billing.monthly;

        $scope.currentPeriodCharges += $scope.timesheet.employees[index].billing.currentPeriodCharges;
        $scope.discount += $scope.timesheet.employees[index].billing.discount;
        $scope.totalPeriodCharges += $scope.timesheet.employees[index].billing.totalPeriodCharges;
      }
    }

    $scope.updateTotals = function(){
      $scope.currentPeriodCharges = 0;
      $scope.discount = 0;
      $scope.totalPeriodCharges = 0;
      calculateTotals();
    }

    $scope.removeEmployee = function(index, name, lastName){
      $scope.currentPeriodCharges -= $scope.timesheet.employees[index].billing.currentPeriodCharges;
      $scope.discount -= $scope.timesheet.employees[index].billing.discount;
      $scope.totalPeriodCharges -= $scope.timesheet.employees[index].billing.totalPeriodCharges;

      $scope.timesheet.employees.splice(index, 1);
      var dayLogs = $scope.timesheet.dayLogs[0].employeesLogsDay;
      var indexLog = 0;
      for(var i=0; i<dayLogs.length; i++){
        if(dayLogs[i].name.firstName == name){
          indexLog = i;
          break;
        }
      }
      for(var date=0; date<$scope.timesheet.dayLogs.length; date++){
        $scope.timesheet.dayLogs[date].employeesLogsDay.splice(indexLog, 1);
      }
    }

    function addEmployee(_id) {
      console.log("received");
      getNewEmployeeInfo(_id);

      getNewEmployeeLogs(_id, timesheet.startDate, timesheet.finishDate);
      /*for(var date=0; date<$scope.timesheet.dayLogs.length; date++){
        $scope.timesheet.dayLogs[date].employeesLogsDay.push(newLogs[date]);
      }*/
    }

    // recurso para obtener logs del usuario
    function getNewEmployeeLogs(_id, startDate, finishDate) {
      LoggiesService.query({
        startDate: $scope.timesheet.startDate,
        finishDate: $scope.timesheet.finishDate,
        employeeId : _id
      }, function (loggys) {
        console.log("loggys", loggys);
        for(var index=0; index<loggys.length; index++){
          var newLog = {
            name: {
              firstName: loggys[index].employee.name,
              lastName: loggys[index].employee.lastName
            },
            activity: loggys[index].activity
          }
          $scope.timesheet.dayLogs[index].employeesLogsDay.push(newLog);
        }

        //return loggys;
      }, function (errorResponse) {
        console.log(errorResponse);
      });

      /*return [{
        name: {
          firstName: "Carlos",
          lastName: "Riancho"
        },
        activity: "Activity"
      },
      {
        name: {
          firstName: "Carlos",
          lastName: "Riancho"
        },
        activity: "Activity"
      },
      {
        name: {
          firstName: "Carlos",
          lastName: "Riancho"
        },
        activity: "Activity"
      }] */
    }

    function getNewEmployeeInfo(_id) {
      // "583e328907f14f71147fefbc"
      Employees.get(
          {employeeId: _id},
          function (employee) {
              employee.dob = new Date(employee.dob);
              console.log("employee", employee);
              var obj = {};
              obj.employee = {};
              obj.billing = {};
              obj.employee.id = employee._id;
              obj.employee.name = employee.name;
              obj.employee.lastName = employee.lastName;
              obj.billing.level = employee.resourceType.rate.name;
              obj.billing.monthly = employee.resourceType.rate.rate;
              obj.billing.vacationSickDays = 0;
              obj.billing.currentPeriodCharges = 0.00;
              obj.billing.discount = 0.00;
              obj.billing.totalPeriodCharges = obj.billing.monthly;

              $scope.timesheet.employees.push(obj);

              $scope.currentPeriodCharges += obj.billing.currentPeriodCharges;
              $scope.discount += obj.billing.discount;
              $scope.totalPeriodCharges += obj.billing.totalPeriodCharges;

              //return obj;
          },
          function (errorResponse) {
              $scope.error = errorResponse.data.message;
          }
      );
      
      /*return {
          employee: {
            name: 'Carlos',
            lastName: 'Riancho'
          },
          billing: {
            level: 'Senior',
            monthly: '20000',
            daysWorked: 15,
            vacationSickDays: 1,
            currentPeriodCharges: 0.00,
            discount: 0.00,
            totalPeriodCharges: 0.00
          }
        } */
    }
  }
}());
