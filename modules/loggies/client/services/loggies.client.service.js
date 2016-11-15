// Loggies service used to communicate Loggies REST endpoints
(function () {
  'use strict';

  angular
    .module('loggies')
    .factory('LoggiesService', LoggiesService);

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
}());
