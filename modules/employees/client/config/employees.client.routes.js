'use strict';

// Setting up route
angular.module('employees').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('employees', {
        abstract: true,
        url: '/employees',
        template: '<ui-view/>'
      })
      .state('employees.list', {
        url: '',
        templateUrl: 'modules/employees/client/views/list-employees.client.view.html',
        controller: 'EmployeesController'
      })
      .state('employees.create', {
        url: '/create',
        templateUrl: 'modules/employees/client/views/create-employee.client.view.html',
        controller: 'EmployeesController'
      });
  }
]);
