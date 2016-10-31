// Employees service used to communicate Employees REST endpoints
(function () {
  'use strict';

  angular
    .module('employees')
    .factory('EmployeesService', EmployeesService);

  EmployeesService.$inject = ['$resource'];

  function EmployeesService($resource) {
    return $resource('api/employees/:employeeId', {
      employeeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
