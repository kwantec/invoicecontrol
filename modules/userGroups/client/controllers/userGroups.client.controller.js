(function () {
	'use strict';
	
	// Employees controller
	angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams','$state', '$mdDialog', '$mdToast', 'Authentication',
		function ($scope, $stateParams, $state, $mdDialog, $mdToast, Authentication) {
			var $ctrl = this;
		
			$scope.successTextAlert = 'Some content';
			$scope.showSuccessAlert = false;


			$scope.postName = function() {
				console.log("Executing query...");
				$mdToast.show($mdToast.simple().textContent('Nombre del grupo de usuario actualizado!'));
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
	]);
}());
