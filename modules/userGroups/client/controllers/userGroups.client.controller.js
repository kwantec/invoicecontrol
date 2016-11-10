(function () {
	'use strict';
	
	// Employees controller
	angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams', '$http','$state', '$mdDialog', '$mdToast', 'ModalService', 
		function ($scope, $stateParams, $http, $state, $mdDialog, $mdToast, ModalService) {
			var $ctrl = this;
		
			$scope.successTextAlert = 'Some content';
			$scope.showSuccessAlert = false;


			$scope.postName = function() {
				console.log("Executing query...");
			};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			$scope.submit = function(){
				console.log("Enviando...");
			};

			$scope.showTabDialog = function(ev){
				$mdDialog.show({
					controller: DialogController,
					templateUrl: 'modules/userGroups/client/views/modal.client.view.html',
					parent: angular.element(document.body),
					targetEvent: ev,
      				clickOutsideToClose:true
				})
				.then(function(answer) {
          			$scope.status = 'You said the information was "' + answer + '".';
        		}, function() {
          			$scope.status = 'You cancelled the dialog.';
        		});
			};

			function DialogController($scope, $mdDialog, $mdToast, ModalService){

				$scope.users = [];
				$scope.user = {};

				$scope.hide = function(){
					$mdDialog.hide();
				};

				$scope.cancel = function(){
					$mdDialog.cancel();
				};

				$scope.answer = function(answer){
					$mdDialog.hide(answer);
					console.log(answer);
				};

				$scope.veriryUser = function(evt){
					console.log("A checar:", $scope.user.username);
					ModalService.getUserByUsername($scope.user.username).then(function(response){
						if (response.data.usernameValid) {
							$mdToast.show($mdToast.simple().textContent('Usuario disponible!'));
						} else {
							$mdToast.show($mdToast.simple().textContent('El usuario ya existe!'));
						}
					}).catch();
					
				};

				$scope.getUsers = function(){
					ModalService.getUsers().then(function(response){
						$scope.users = response.data;
					}).catch(function(err){
						console.log("Error:", err);
					});
				};
			}

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
		}
	]);
}());
