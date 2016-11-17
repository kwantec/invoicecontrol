(function () {
	'use strict';
	
	// Employees controller
	angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams','$state', '$mdDialog',
		'$mdToast', 'Authentication', 'UserGroupsService',
		function ($scope, $stateParams, $state, $mdDialog, $mdToast, Authentication, UserGroupsService) {
			$scope.authentication = Authentication;
	        $scope.successTextAlert = 'Some content';
			$scope.showSuccessAlert = false;

            $scope.findUserGroup = function () {
                UserGroupsService.getUserGroup($stateParams.userGroupId).then(function (response) {
                    $scope.userGroup = response.data;
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

            $scope.create = function (isValid) {
				console.log(isValid);
				if (isValid) {
					UserGroupsService.createUserGroup($scope.userGroup).then(function (response) {
						// If error, show a dilaog
						$mdDialog.show($mdDialog.alert()
							.clickOutsideToClose(true)
							.title('Operación exitosa')
							.textContent('¡El Grupo de Usuario:' + response.data.name + ' ha sido creado!')
							.ok('¡Entendido!')
						);
						$state.go('userGroups.view', {userGroupId: response.data._id});
					}).catch(function (err) {
						// If error, show a dilaog
						$mdDialog.show($mdDialog.alert()
							.clickOutsideToClose(true)
							.title('Un error ha ocurrido')
							.textContent(err.data.message)
							.ok('¡Entendido!')
						);
					});
				} else {
					return false;
				}
			};

			$scope.switchBool = function(value) {
				$scope[value] = !$scope[value];
			};

			$scope.submit = function(){
				console.log("Enviando...");
			};

			$scope.showTabDialog = function(ev){
				// Show modal
				$mdDialog.show({
					controller: 'DialogController',
					templateUrl: 'modules/userGroups/client/views/modal.client.view.html',
					parent: angular.element(document.body),
					targetEvent: ev,
      				clickOutsideToClose:false
				})
				.then(function(answer) {
        	$scope.status = 'You said the information was "' + answer + '".';
      	}, function() {
        		$scope.status = 'You cancelled the dialog.';
      	});
			};
		}
	])
	.config(function ($mdThemingProvider) {
		// $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
        // $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	});
}());
