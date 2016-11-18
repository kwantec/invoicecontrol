( function () {
	'use strict';

	angular.module('userGroups').controller('DialogController', ['$scope', '$mdDialog', '$mdToast', 'ModalService',
		'PasswordValidator', 'Authentication', 'UserGroupsService',
		function($scope, $mdDialog, $mdToast, ModalService, PasswordValidator, Authentication, UserGroupsService){
		$scope.users = [];
		$scope.authentication = Authentication;

		$scope.cancel = function(){
			// Close the dialog
			$mdDialog.cancel();
		};

		$scope.addUserToUserGroup = function (user, event) {
			UserGroupsService.setUserToList(user._id);
			console.log("Users now:", UserGroupsService.getUsersList());
			$mdDialog.show(
				$mdDialog.alert()
					.title('Usuario agregado')
					.textContent('El usuario ' + user.username + ' ha sido agregado correctamente')
					.ariaLabel(user.username)
					.ok('Cerrar')
					.targetEvent(event)
			);
		};

		$scope.veriryUser = function(evt){
			// Make a HTTP get to find a username
			ModalService.getUserByUsername($scope.credentials.username).then(function(response){
				if (response.data.usernameValid) {
					// If the username retrieve is true, you CAN'T use the Username
					$mdToast.show($mdToast.simple().textContent('Usuario disponible!'));
				} else {
					// If the username is false, you can use, it's avaliable
					$mdToast.show($mdToast.simple().textContent('El usuario ya existe!'));
				}
			}).catch(function (err) {
				// If error, show a dilaog
				$mdDialog.show($mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Un error ha ocurrido')
					.textContent(err.data.message)
					.ok('¡Entendido!')
				);
			});
			
		};

		$scope.getUsers = function(){
			// Make a HTTP get to retrieve all the users
			ModalService.getUsers().then(function(response){
				$scope.users = response.data;
			}).catch(function(err){
				// If error, show a dialog
				$mdDialog.show($mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Un error ha ocurrido')
					.textContent(err.data.message)
					.ok('¡Entendido!')
				);
			});
		};

		$scope.createUserAndAdd = function (isValid) {
			// If the form is valid
			if (isValid) {
				// If is valid, make a HTTP post to save a new user
				ModalService.createUser($scope.credentials).then(function (response) {
					// If all god, show a dialog
					$mdDialog.show($mdDialog.alert()
						.clickOutsideToClose(true)
						.title('¡Operacion exitosa!')
						.textContent('The user ' + response.data.displayName + ' has been created successfully')
						.ok('¡Entendido!')
					);
				}).catch(function (err) {
					// If error, show a dialog with the error
					$mdDialog.show($mdDialog.alert()
						.clickOutsideToClose(true)
						.title('Un error ha ocurrido')
						.textContent(err.data.message)
						.ok('¡Entendido!')
					);
				});
			} else {
				// If not valid, show a toast with the info
				$mdToast.show($mdToast.simple().textContent('El formulario no es válido'));
				return false;
			}
		};
	}]);
}());