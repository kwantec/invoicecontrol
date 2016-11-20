(function () {
    'use strict';

    // Employees controller
    angular.module('userGroups').controller('UserGroupsController', ['$scope', '$stateParams', '$state', '$mdDialog',
        '$mdToast', 'Authentication', 'UserGroupsService',
        function ($scope, $stateParams, $state, $mdDialog, $mdToast, Authentication, UserGroupsService) {
            $scope.authentication = Authentication;
            $scope.successTextAlert = 'Some content';
            $scope.users = [];
            $scope.showSuccessAlert = false;
            var listPermissionsSelected = [];

            $scope.findUserGroup = function () {
                UserGroupsService.getUserGroup($stateParams.userGroupId).then(function (response) {
                    $scope.userGroup = response.data;
                    for (var i = 0 ; i < $scope.userGroup.users.length ; i++) {
                        $scope.users.push($scope.userGroup.users[i]);
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

            $scope.update = function(isValid) {
                if (isValid) {
                    UserGroupsService.updateUserGroup($scope.userGroup).then(function (response) {
                        // If success, show a dilaog
                        $mdDialog.show($mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Operación exitosa')
                            .textContent('¡El Grupo de Usuario:' + response.data.name + ' ha sido actualizado!')
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

            $scope.create = function (isValid) {
                console.log(listPermissionsSelected);
                if (isValid) {
                    var data = {
                        name: $scope.userGroup.name,
                        description: $scope.userGroup.description,
                        permissions: listPermissionsSelected
                    };
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
                };
                listPermissionsSelected.push(data);

            };

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
                    clickOutsideToClose: false,
                    locals: {
                        usersFromUserGroup: $scope.userGroup.users
                    }
                })
                .then(function (user) {
                    $scope.users.push(user);
                    $scope.userGroup.users.push(user._id);
                }, function () {
                        $scope.status = 'You cancelled the dialog.';
                }, function (newUser) {
                    console.log("ESTE?", newUser);
                });
            };
            
            $scope.deleteUserFromUserGroup = function (user, evt) {
                var indexUser = $scope.users.indexOf(user);

                // Find a user with the id equals to the users list from the userGroup
                var _tempUser = $scope.userGroup.users.find(function (_userId) {
                    return _userId === user._id;
                });

                // And now, with the tempUser you can make the 'indexOf'.
                var indexUserFromUG = $scope.userGroup.users.indexOf(_tempUser);

                // If the result of the 'indexOf' is different not '-1'
                if (indexUser >= 0 && indexUserFromUG >= 0) {
                    $scope.users.splice(indexUser, 1);
                    $scope.userGroup.users.splice(indexUserFromUG, 1);
                } else if (indexUser >= 0) {
                    $scope.users.splice(indexUser, 1);
                } else {
                    $mdDialog.show($mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Un error ha ocurrido')
                        .textContent("Intente recargar la página y volver a ejecutar esta acción")
                        .ok('¡Entendido!')
                    );
                }
            };
            
        }
    ])
}());
