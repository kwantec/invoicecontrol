(function () {
	'use strict';
	
	// Employees controller
	angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams', '$http','$state',
		function ($scope, $stateParams, $http, $state) {
			var $ctrl = this;
		
			$scope.successTextAlert = 'Some content';
			$scope.showSuccessAlert = false;


			$scope.search = function() {
				console.log("Executing query...");
			};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			$scope.submit = function(){
				console.log("Enviando...");
			};

			// $ctrl.users = [{name: 'paco'}, {name: 'lola'}];
			// $scope.openModal = function() {
			// 	console.log("Abriendo modal...");
			// 	var modalInstance = $uibModal.open({
			// 		templateUrl: 'modules/userGroups/client/views/modal.client.view.html',
			// 		controller: 'ModalAddUserController',
			// 		controllerAs: '$ctrl',
			// 		size: 'lg',
			// 		resolve: {
			// 			modalService: function () {
			// 				return ModalService;
			// 			}
			// 		}
			// 	});
			// };
			
			$scope.openModal = function() {

			};
		}
	]);
}());
