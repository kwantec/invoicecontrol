(function () {
  'use strict';

  angular
    .module('timesheets')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('timesheets', {
        abstract: true,
        url: '/timesheets',
        template: '<ui-view/>'
      })
      .state('timesheets.list', {
        url: '',
        templateUrl: 'modules/timesheets/client/views/list-timesheets.client.view.html',
        controller: 'TimesheetsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Timesheets List'
        }
      })
      .state('timesheets.create', {
        url: '/create',
        templateUrl: 'modules/timesheets/client/views/form-timesheet.client.view.html',
        controller: 'TimesheetsController',
        controllerAs: 'vm',
        resolve: {
          timesheetResolve: newTimesheet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Timesheets Create'
        }
      })
      .state('timesheets.edit', {
        url: '/:timesheetId/edit',
        templateUrl: 'modules/timesheets/client/views/edit-timesheet.client.view.html',
        controller: 'TimesheetsController',
        controllerAs: 'vm',
        resolve: {
          timesheetResolve: getTimesheet
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Timesheet {{ timesheetResolve.name }}'
        }
      })
      .state('timesheets.view', {
        url: '/:timesheetId',
        templateUrl: 'modules/timesheets/client/views/view-timesheet.client.view.html',
        controller: 'TimesheetsController',
        controllerAs: 'vm',
        resolve: {
          timesheetResolve: getTimesheet
        },
        data: {
          pageTitle: 'Timesheet {{ timesheetResolve.name }}'
        }
      });
  }

  getTimesheet.$inject = ['$stateParams', 'TimesheetsService'];

  function getTimesheet($stateParams, TimesheetsService) {
    return TimesheetsService.get({
      timesheetId: $stateParams.timesheetId
    }).$promise;
    return getTimesheetMock;
  }

  newTimesheet.$inject = ['TimesheetsService'];

  function newTimesheet(TimesheetsService) {
    return new TimesheetsService();
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
        monthly: '10000',
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
        monthly: '10000',
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
        monthly: '10000',
        daysWorked: 15,
        vacationSickDays: 1,
        currentPeriodCharges: 0.00,
        discount: 0.00,
        totalPeriodCharges: 0.00
      }
    }]
  };
}
}());
