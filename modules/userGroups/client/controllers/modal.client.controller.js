// (function () {
// 	'use strict';

// 	// angular.module('test').controller('name', ['', function(){
		
// 	// }]);

// 	// Modal add user controller
// 	angular.module('userGroups').controller('ModalAddUserController', ModalController);

// 	function ModalController ($uibModalInstance, modalService) {
// 		var $ctrl = this;
// 		$ctrl.users = [];
// 		$ctrl.modalService = modalService;

// 		$ctrl.getAllUsers = function () {
// 			$ctrl.modalService.getUsers();
// 			modalService.getUsers().then(function (response) {
// 				console.log("Response", response);
// 				$ctrl.users = response.data;
// 			}).catch(function (err) {
// 				console.log("Error:". err);
// 			});
// 		};

// 		$ctrl.searchUsers = function () {
			
// 		};

// 		$ctrl.verifyUsername = function () {
// 			console.log("Verifing username...");
// 		};

// 		$ctrl.getUsers = function () {
// 			// console.log("Get more users...");
// 			$ctrl.modalService.getUsers();
// 		};

// 		$ctrl.success = function () {
// 			console.log("OK...");
// 			$uibModalInstance.close('asd');
// 		};

// 		$ctrl.cancel = function () {
// 			console.log("Cancel...");
// 			$uibModalInstance.dismiss('cancel');
// 		};
// 	}
// }());