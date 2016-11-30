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
        templateUrl: 'modules/timesheets/client/views/form-timesheet.client.view.html',
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
  }

  newTimesheet.$inject = ['TimesheetsService'];

  function newTimesheet(TimesheetsService) {
    return new TimesheetsService();
  }
}());
