(function () {
    'use strict';

    angular
        .module('customers')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('customers', {
                abstract: true,
                url: '/customers',
                template: '<ui-view/>'
            })
            .state('customers.create', {
                url: '/create',
                controller: 'CustomersController',
                templateUrl: 'modules/customers/client/views/create-customer.client.view.html'
            })
            .state('customers.list', {
                url: '/list',
                controller: 'CustomersController',
                templateUrl: 'modules/customers/client/views/list-customers.client.view.html'
            })
            .state('customers.edit', {
                url: '/:customerId/edit',
                controller: 'CustomersController',
                templateUrl: 'modules/customers/client/views/edit-customer.client.view.html'
            })
            .state('customers.view', {
                url: '/:customerId',
                controller: 'CustomersController',
                templateUrl: 'modules/customers/client/views/view-customer.client.view.html'
            });
    }
})();