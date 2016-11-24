/**
 * Created by Izanami on 24/11/2016.
 */
(function () {
  'use strict';

  angular.module('userGroups').service('PermissionsService', ['$http', PermissionsService]);

  function PermissionsService($http){

    return {
      getPermissions: getPermissionsByUserGroup,
      getPermissionsByUser: getPermissionsByUser
    };



    function getPermissionsByUserGroup (userGroupId) {
      var url = 'http://localhost:3000/api/permissions/userGroup/' +userGroupId;
      return $http({ method:'GET', url: url });
    }

    function getPermissionsByUser (user) {
      var url = 'http://localhost:3000/api/permissions/userGroup/' +user.userGroup;
      return $http({ method: 'GET', url: url });
    }
  }

}());
