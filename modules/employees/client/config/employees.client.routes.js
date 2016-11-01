/**
 * Created by Andre on 29/10/2016.
 */
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
            .state('employees.create', {
                url: '/create',
                controller: 'EmployeesClientController',
                templateUrl: 'modules/employees/client/views/form-employees.client.view.html'
            })
            .state('employees.list', {
                url: '/list',
                controller: 'EmployeesListClientController',
                templateUrl: 'modules/employees/client/views/list-employees.client.view.html'
            });
    }
}());