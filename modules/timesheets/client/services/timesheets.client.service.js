// Timesheets service used to communicate Timesheets REST endpoints
(function () {
  'use strict';

  angular
    .module('timesheets')
    .factory('TimesheetsService', TimesheetsService);

  TimesheetsService.$inject = ['$resource'];

  function TimesheetsService($resource) {
    return $resource('api/timesheets/:timesheetId', {
      timesheetId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
