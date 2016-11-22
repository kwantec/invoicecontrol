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
            this.check = false;
            var listPermissionsSelected = [];

            /**
             * Function to find the userGroup to edit or view
             */
            $scope.findUserGroup = function () {
                UserGroupsService.getUserGroup($stateParams.userGroupId).then(function (response) {
                    $scope.userGroup = response.data;
                    for (var i = 0; i < $scope.userGroup.users.length; i++) {
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

            /**
             * Function to update a usersGroup
             * @param isValid - If the form is valid or not, the name and the description must be required
             * @returns false if error
             */
            $scope.update = function (isValid) {
                if (isValid) {
                    var data = {
                        _id: $scope.userGroup._id,
                        name: $scope.userGroup.name,
                        description: $scope.userGroup.description,
                        permissions: listPermissionsSelected
                    };
                    UserGroupsService.updateUserGroup(data).then(function (response) {
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

            /**
             * Function to create a new userGroup
             * @param isValid -  If the form is valid, the needs the name and the description
             * @returns false if the form is not valid
             */
            $scope.create = function (isValid) {
                if (isValid) {
                    var data = {
                        name: $scope.userGroup.name,
                        description: $scope.userGroup.description,
                        permissions: listPermissionsSelected
                    };
                    UserGroupsService.createUserGroup(data).then(function (response) {
                        // If success, show a dilaog
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

            /**
             * Function to add a permission
             */
            $scope.addPermision = function () {
                if (this.check) {
                    this.check = false;
                    for (var i = 0; i < listPermissionsSelected.length; i++) {
                        if (listPermissionsSelected[i].module == this.$parent.module._id && listPermissionsSelected[i].permission == this.permission._id) {
                            listPermissionsSelected.splice(i, 1);
                        }
                    }
                } else {
                    this.check = true;
                    var data = {
                        module: this.$parent.module._id,
                        permission: this.permission._id
                    };
                    listPermissionsSelected.push(data);
                }
            };

            /**
             * Function to get the list of all the usersGroups
             */
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

            /**
             * Function to get the list of modules, to show in the view, show all the modules and all the permissions
             */
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

            /**
             * Function to delete a userGroup
             * @param id - The id of the userGroup to delete
             * @param index - The index of the userGroup on the array
             */
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

            /**
             * Function to show a tab dialog
             * @param ev - an event pass by the view
             */
            $scope.showTabDialog = function (ev) {
                // Show modal
                $mdDialog.show({  // Modal config
                    controller: 'DialogController',
                    templateUrl: 'modules/userGroups/client/views/modal.client.view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    locals: {  // Locals, parameters from parent (this controller) to the modal controller
                        localUsers: $scope.users
                    }
                })
                    .then(function (user) { // Function executed after close modal
                        $scope.users.push(user);
                        $scope.userGroup.users.push(user._id);
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

            /**
             * Function to delete a user from the list of the userGroup, here we need to delete the user in 2 arrays,
             * one to the localUsers, and other at the users from the usersGroup
             * @param user - the user to delete
             * @param evt - A event passed by the view
             */
            $scope.deleteUserFromUserGroup = function (user, evt) {
                var indexUser = $scope.users.indexOf(user); // Get the index of the user

                // Find a user with the id equals to the users list from the userGroup
                var _tempUser = $scope.userGroup.users.find(function (_userId) {
                    return _userId === user._id;
                });

                // And now, with the tempUser you can make the 'indexOf' to the $scope.userGroup.users
                var indexUserFromUG = $scope.userGroup.users.indexOf(_tempUser);

                // If the result of the 'indexOf' is different not '-1'
                if (indexUser >= 0 && indexUserFromUG >= 0) {
                    // Delete the user in both arrays
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

            $scope.permissionsSelected = function(){
                // console.log(this);
                //  console.log(this.module._id);
                //  console.log(this.permission._id);
                var data={};
                // console.log($scope.userGroup);
                for(var i=0;i<$scope.userGroup.permissions.length;i++){
                    if(this.module._id == $scope.userGroup.permissions[i].module._id &&
                        this.permission._id == $scope.userGroup.permissions[i].permission._id){
                        this.check = true;
                        data = {
                            module: $scope.userGroup.permissions[i].module._id,
                            permission: $scope.userGroup.permissions[i].permission._id
                        };
                        listPermissionsSelected.push(data);
                    }
                }





            };

        }
    ]);
}());
