(function () {
    'use strict';

    // Setting up route
    angular
        .module('userGroups')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        // Articles state routing
        $stateProvider
            .state('userGroups', {
                abstract: true,
                url: '/userGroups',
                template: '<ui-view/>'
            })
            .state('userGroups.create', {
                url: '/create',
                templateUrl: 'modules/userGroups/client/views/create-userGroup.client.view.html',
                controller: 'UserGroupsController'
            })
            .state('userGroups.list', {
                url: '/list',
                templateUrl: 'modules/userGroups/client/views/list-userGroup.client.view.html',
                controller: 'UserGroupsController'
            })
            .state('userGroups.view', {
                url: '/:userGroupId',
                templateUrl: 'modules/userGroups/client/views/view-userGroup.client.view.html',
                controller: 'UserGroupsController'
            });

    }

}());
