'use strict';

//ResourceType service used for communicating with the ResourceType REST endpoints
angular.module('workTeams').factory('WorkTeams', ['$resource',
    function ($resource) {
        return $resource('api/workTeams/:workTeamId', {
            resourceTypeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
