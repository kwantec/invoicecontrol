(function () {
    'use strict';

    // Employees controller
    angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams', '$state', '$mdDialog',
        '$mdToast', 'Authentication', 'UserGroupsService',
        function ($scope, $stateParams, $state, $mdDialog, $mdToast, Authentication, UserGroupsService) {
            $scope.authentication = Authentication;
            $scope.successTextAlert = 'Some content';
            $scope.showSuccessAlert = false;
            var listPermissionsSelected = [];

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
                console.log(listPermissionsSelected);
                if (isValid) {
                    var data = {
                        name: $scope.userGroup.name,
                        description: $scope.userGroup.description,
                        permissions: listPermissionsSelected
                    }
                    UserGroupsService.createUserGroup(data).then(function (response) {
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

            $scope.addPermision = function () {
                var data = {
                    module: this.$parent.module._id,
                    permission: this.permission.permissionId._id
                }
                listPermissionsSelected.push(data);

            }
            $scope.getListUserGroup = function () {
                UserGroupsService.getListUserGroup().then(function (response) {
                    $scope.listUserGroup = response.data;
                }).catch(function (err) {
                    $mdDialog.show($mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Un error ha ocurrido')
                        .textContent(err.data.message)
                        .ok('¡Entendido!')
                    );
                });
            };

            $scope.getListModules = function () {
                UserGroupsService.getListModules().then(function (response) {
                    $scope.listModules = response.data;
                }).catch(function (err) {
                    $mdDialog.show($mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Un error ha ocurrido')
                        .textContent(err.data.message)
                        .ok('¡Entendido!')
                    );
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
                        swal({
                            title: "<h1>Borrado</h1>",
                            text: "El grupo <strong>" + response.data.name + "</strong>  ha sido eliminado",
                            type: "success",
                            html: true
                        });
                        // swal("Borrado", "El grupo " + response.data.name + "  ha sido elimnado", "success");
                        $scope.listUserGroup.splice(index, 1);
                    }).catch(function (err) {

                    });
                });
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
