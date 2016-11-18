/**
 * Created by buira on 15/11/2016.
 */

(function () {
    'use strict';

    angular.module('userGroups').factory('UserGroupsService', ['$http', UserGroupsService]);

    function UserGroupsService($http) {
        var users= [];
        return {
            getUserGroup: getUserGroup,
            getListUserGroup: getListUserGroup,
            deleteUserGroup: deleteUserGroup,
            createUserGroup: createUserGroup,
            updateUserGroup: updateUserGroup,
            setUsersList: setUsersList,
            getUsersList: getUsersList,
            setUserToList: setUserToList
        };

        function setUsersList (_users) {
            users = _users;
        }

        function setUserToList(userId) {
            users.push(userId);
        }

        function getUsersList() {
            return users;
        }

        function getUserGroup(userGroupId) {
            return $http({method: 'GET', url: 'http://localhost:3000/api/userGroups/' + userGroupId});
        }

        function getListUserGroup() {
            return $http({method: 'GET', url: 'http://localhost:3000/api/userGroups/'});
        }

        function deleteUserGroup(userGroupId) {
            return $http({method: 'DELETE', url: 'http://localhost:3000/api/userGroups/' + userGroupId});
        }

        function createUserGroup(data) {
            return $http({method: 'POST', data: data, url: 'http://localhost:3000/api/userGroups'});
        }

        function updateUserGroup(data) {
            return $http({method: 'PUT', data: data, url: 'http://localhost:3000/api/userGroups/' + data._id});
        }
    }
}());
