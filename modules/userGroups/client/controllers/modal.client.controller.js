( function () {
	'use strict';

	angular.module('userGroups').controller('DialogController', ['$scope', '$mdDialog', '$mdToast', 'ModalService',
		'PasswordValidator', 'Authentication', 'localUsers',
		function($scope, $mdDialog, $mdToast, ModalService, PasswordValidator, Authentication, localUsers){
			$scope.users = [];
			$scope.authentication = Authentication;

			/**
			 * Function to close the tab dialog
			 */
			$scope.cancel = function(){
				$mdDialog.cancel();
			};

			/**
			 * Function to add a user, the action to add a user is executed after close the modal,
			 * definited on the userGroup controller
			 * @param user - The user to add
			 */
			$scope.addUserToUserGroup = function (user) {
				$mdDialog.hide(user); // Close the modal, check the userGroup controller to find the logic

				// Show a message
				$mdDialog.show(
					$mdDialog.alert()
						.title('Usuario agregado')
						.textContent('El usuario ' + user.username + ' ha sido agregado correctamente')
						.ariaLabel(user.username)
						.ok('Cerrar')
						.targetEvent(event)
				);
			};

			/**
			 * Function to verify if a username is available, if is, show a message to the user
			 * @param evt
			 */
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

			/**
			 * Function to get all the users and list them on the second tab
			 */
			$scope.getUsers = function(){
				// Make a HTTP get to retrieve all the users
				ModalService.getUsers().then(function(response){
					$scope.users = response.data;

					// Function to return a user that has been added on the user Group.
					var getUserWithId = function (_user) {
						return localUsers[i]._id === _user._id;
					};

					// Iterate over users and delete those that are already added in the user group.
					for (var i = 0 ; i < localUsers.length ; i++) {
						var userToDelete = $scope.users.find(getUserWithId);
						var index = $scope.users.indexOf(userToDelete); // Find the index of the user
						$scope.users.splice(index, 1); // Delete the user
					}
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

			/**
			 * Create a new user and then, add it to the userGroup
			 * @param isValid - If the form is valid
			 * @returns {boolean} - False if the form is not valid
			 */
			$scope.createUserAndAdd = function (isValid) {
				// If the form is valid
				if (isValid) {
					// If is valid, make a HTTP post to save a new user
					ModalService.createUser($scope.credentials).then(function (response) {
						// If all god, show a dialog
						var newUser = response.data;
						$mdDialog.hide(newUser);
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
