'use strict';

angular.module('employees').factory('Employees', ['$resource',
    function ($resource) {
        return $resource('api/employees/:employeeId', {
            employeeId: '@_id'
        },{
            update: {
                method: 'PUT'
            }
        });
    }
]);
