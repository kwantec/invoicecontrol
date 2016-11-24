(function () {
  'use strict';

  // Timesheets controller
  angular
    .module('timesheets')
    .controller('TimesheetsController', TimesheetsController);

  TimesheetsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'timesheetResolve'];

  function TimesheetsController ($scope, $state, $window, Authentication, timesheet) {
    var vm = this;

    vm.authentication = Authentication;
    //vm.timesheet = timesheet;
    vm.timesheet = $scope.timesheet;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    $scope.timesheet = {
      team: {
        name: 'FERROS'
      },
      startDate: '1/12/2016',
      finishDate: '30/12/2016',
      workDaysInPeriod: 15,
      workDaysInMonth: 15,
      dayLogs: [{
        date: "12/12/2016",
        employeesLogsDay: [{
          name: {
            firstName: 'Migui',
            lastName: 'Rodriguez'
          },
          activity: "Actividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de MiguiActividad de Migui"
        },{
          name: {
            firstName: 'Rob',
            lastName: 'Franco'
          },
          activity: "Actividad de Rob"
        },{
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
        },{
          name: {
            firstName: 'Rob',
            lastName: 'Franco'
          },
          activity: "Actividad de Rob"
        },{
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
        },{
          name: {
            firstName: 'Rob',
            lastName: 'Franco'
          },
          activity: "Actividad de Rob"
        },{
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
          monthly: '10000',
          daysWorked: 15,
          vacationSickDays: 1,
          currentPeriodCharges: 0.00,
          discount: 0.00,
          totalPeriodCharges: 0.00
        }
      }]
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
  }
}());
