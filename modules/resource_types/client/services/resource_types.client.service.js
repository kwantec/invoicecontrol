'use strict';

//ResourceType service used for communicating with the ResourceType REST endpoints
angular.module('resourceTypes').factory('ResourceTypes', ['$resource',
    function ($resource) {
        return $resource('api/resourceTypes/:resourceTypeId', {
            resourceTypeId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
