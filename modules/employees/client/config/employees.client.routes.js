(function () {
  'use strict';

  angular
    .module('employees')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('employees', {
        abstract: true,
        url: '/employees',
        template: '<ui-view/>'
      })
      .state('employees.list', {
        url: '',
        templateUrl: 'modules/employees/client/views/list-employees.client.view.html',
        controller: 'EmployeesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Employees List'
        }
      })
      .state('employees.create', {
        url: '/create',
        templateUrl: 'modules/employees/client/views/form-employee.client.view.html',
        controller: 'EmployeesController',
        controllerAs: 'vm',
        resolve: {
          employeeResolve: newEmployee
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Employees Create'
        }
      })
      .state('employees.edit', {
        url: '/:employeeId/edit',
        templateUrl: 'modules/employees/client/views/form-employee.client.view.html',
        controller: 'EmployeesController',
        controllerAs: 'vm',
        resolve: {
          employeeResolve: getEmployee
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Employee {{ employeeResolve.name }}'
        }
      })
      .state('employees.view', {
        url: '/:employeeId',
        templateUrl: 'modules/employees/client/views/view-employee.client.view.html',
        controller: 'EmployeesController',
        controllerAs: 'vm',
        resolve: {
          employeeResolve: getEmployee
        },
        data: {
          pageTitle: 'Employee {{ employeeResolve.name }}'
        }
      });
  }

  getEmployee.$inject = ['$stateParams', 'EmployeesService'];

  function getEmployee($stateParams, EmployeesService) {
    return EmployeesService.get({
      employeeId: $stateParams.employeeId
    }).$promise;
  }

  newEmployee.$inject = ['EmployeesService'];

  function newEmployee(EmployeesService) {
    return new EmployeesService();
  }
}());
