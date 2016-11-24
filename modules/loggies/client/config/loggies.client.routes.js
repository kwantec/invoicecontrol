(function () {
    'use strict';

    angular
        .module('loggies')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('loggies', {
                abstract: true,
                url: '/loggies',
                template: '<ui-view/>'
            })
            .state('loggies.list', {
                url: '',
                templateUrl: 'modules/loggies/client/views/list-loggies.client.view.html',
                controller: 'LoggiesListController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Loggies List'
                }
            })
            .state('loggies.create', {
                url: '/create:loggyDate',
                templateUrl: 'modules/loggies/client/views/form-loggy.client.view.html',
                controller: 'LoggiesController',
                controllerAs: 'vm',
                resolve: {
                    loggyResolve: newLoggy
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Loggies Create'
                }
            })
            .state('loggies.edit', {
                url: '/:loggyId/edit',
                templateUrl: 'modules/loggies/client/views/form-loggy.client.view.html',
                controller: 'LoggiesController',
                controllerAs: 'vm',
                resolve: {
                    loggyResolve: getLoggy
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Edit Loggy {{ loggyResolve.name }}'
                }
            })
            .state('loggies.view', {
                url: '/:loggyId',
                templateUrl: 'modules/loggies/client/views/view-loggy.client.view.html',
                controller: 'LoggiesController',
                controllerAs: 'vm',
                resolve: {
                    loggyResolve: getLoggy
                },
                data: {
                    pageTitle: 'Loggy {{ loggyResolve.name }}'
                }
            })
    }

    getLoggy.$inject = ['$stateParams', 'LoggiesService'];
    getDate.$inject = ['$stateParams', 'LoggiesDateService'];

    function getLoggy($stateParams, LoggiesService) {
        return LoggiesService.get({
            loggyId: $stateParams.loggyId
        }).$promise;
    }

    function getDate($stateParams, LoggiesDateService) {
        return LoggiesDateService.get({
            loggyDate: $stateParams.loggyDate
        }).$promise;
    }

    newLoggy.$inject = ['LoggiesService'];

    function newLoggy(LoggiesService) {
        return new LoggiesService();
    }
}());
