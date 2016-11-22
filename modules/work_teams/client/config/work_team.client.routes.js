(function(){
    'use strict';
    angular
        .module('workTeams')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        $stateProvider
            .state('work-teams', {
                abstract: true,
                url: '/work-teams',
                template: '<ui-view/>'
            })
            .state('work-teams.list', {
                url: '',
                templateUrl: 'modules/work_teams/client/views/list-work-team.client.view.html'
            })
            .state('work-teams.create', {
                url: '/create',
                templateUrl: 'modules/work_teams/client/views/create-work-team.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('work-teams.view', {
                url: '/:workTeamId',
                templateUrl: 'modules/work_teams/client/views/view-work-team.client.view.html'
            })
            .state('work-teams.edit', {
                url: '/:workTeamId/edit',
                templateUrl: 'modules/work_teams/client/views/edit-work-team.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            });
    }
})();

