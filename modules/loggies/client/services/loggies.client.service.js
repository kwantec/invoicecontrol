// Loggies service used to communicate Loggies REST endpoints
(function () {
  'use strict';

  angular
    .module('loggies')
    .factory('LoggiesService', LoggiesService)
    .factory('LoggiesDateService', LoggiesDateService)

  LoggiesService.$inject = ['$resource'];

  function LoggiesService($resource) {
    return $resource('api/loggies/:loggyId', {
      loggyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function LoggiesDateService($resource) {
    return $resource('api/loggies/:loggyDate', {
      loggyDate: '@_date'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
