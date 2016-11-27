(function(){
    'use strict';
    angular
        .module('resourceTypes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('resource-types', {
                abstract: true,
                url: '/resource-types',
                template: '<ui-view/>'
            })
            .state('resource-types.list', {
                url: '',
                templateUrl: 'modules/resource_types/client/views/list-resource-type.client.view.html'
            })
            .state('resource-types.create', {
                url: '/create',
                templateUrl: 'modules/resource_types/client/views/create-resource-type.client.view.html'
            })
            .state('resource-types.view', {
                url: '/:resourceTypeId',
                templateUrl: 'modules/resource_types/client/views/view-resource-type.client.view.html'
            })
            .state('resource-types.edit', {
                url: '/:resourceTypeId/edit',
                templateUrl: 'modules/resource_types/client/views/edit-resource-type.client.view.html'
            });
    }
})();

