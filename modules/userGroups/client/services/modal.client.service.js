(function () {
	'use strict';

	angular.module('userGroups').service('ModalService', ['$http', UserGroupsService]);

	function UserGroupsService($http){
		return {
			getUsers: getUsers
		};

		function getUsers () {
			console.log("Trayendo usuarios...");
			var url = 'http://localhost:3000/api/users';
			return $http({method:'GET', url: url});
		}
	}
		
}());