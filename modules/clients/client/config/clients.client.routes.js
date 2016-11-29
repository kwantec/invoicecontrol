(function () {
    'use strict';

    angular
        .module('clients')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('clients', {
                abstract: true,
                url: '/clients',
                template: '<ui-view/>'
            })
            .state('clients.create', {
                url: '/create',
                controller: 'ClientsController',
                templateUrl: 'modules/clients/client/views/create-client.client.view.html'
            })
            .state('clients.list', {
                url: '/list',
                controller: 'ClientsController',
                templateUrl: 'modules/clients/client/views/list-clients.client.view.html'
            })
            .state('clients.edit', {
                url: '/:clientId/edit',
                controller: 'ClientsController',
                templateUrl: 'modules/clients/client/views/edit-client.client.view.html'
            })
            .state('clients.view', {
                url: '/:clientId',
                controller: 'ClientsController',
                templateUrl: 'modules/clients/client/views/view-client.client.view.html'
            });
    }
})();