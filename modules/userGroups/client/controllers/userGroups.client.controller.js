(function () {
    'use strict';

    // Employees controller
    angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams', '$state', '$mdDialog',
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

            $scope.getListUserGropu = function () {
                UserGroupsService.getListUserGroup().then(function (response) {
                    $scope.listUserGroup = response.data;
                }).catch(function (err) {

                });
            };

            $scope.delete = function (id, index) {
                swal({
                    title: "¿Estas seguro de borrar este grupo?",
                    text: "No prodras revertir esta accion",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si, borrar",
                    closeOnConfirm: false
                }, function () {
                    UserGroupsService.deleteUserGroup(id).then(function (response) {
                        swal("Borrado", "El grupo " + response.name + " ha sido elimnado", "success");
                        $scope.listUserGroup.splice(index, 1);
                    }).catch(function (err) {

                    });
                });
            };

            $scope.postName = function () {
                console.log("Executing query...");
                $mdToast.show($mdToast.simple().textContent('Nombre del grupo de usuario actualizado!'));
            };

            $scope.switchBool = function (value) {
                $scope[value] = !$scope[value];
            };

            $scope.submit = function () {
                console.log("Enviando...");
            };

            $scope.showTabDialog = function (ev) {
                // Show modal
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'modules/userGroups/client/views/modal.client.view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false
                })
                    .then(function (answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function () {
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
