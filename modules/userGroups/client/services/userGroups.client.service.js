/**
 * Created by buira on 15/11/2016.
 */

(function () {
    'use strict';

    angular.module('userGroups').factory('UserGroupsService', ['$http', UserGroupsService]);

    function UserGroupsService ($http) {
        return {
            getUserGroup: getUserGroup,
            createUserGroup: createUserGroup
        };

        function getUserGroup (userGroupId) {
            return $http({method: 'GET', url: 'http://localhost:3000/api/userGroups/' + userGroupId});
        }

        function createUserGroup (data) {
            return $http({method: 'POST', data: data, url: 'http://localhost:3000/api/userGroups'});
        }
    }
}());
