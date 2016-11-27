'use strict';

angular.module('clients').factory('Clients', ['$resource',
    function ($resource) {
        return $resource('api/clients/:clientId', {
            clientId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);