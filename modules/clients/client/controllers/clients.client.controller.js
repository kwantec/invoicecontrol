'use strict';

angular.module('clients').controller('ClientsController', [
    '$scope',
    '$stateParams',
    '$location',
    'Authentication',
    'Clients',
    'PurchaseOrders',
    'WorkTeams',
    '$mdDialog',
    '$mdToast',
    function ($scope, $stateParams, $location, Authentication, Clients, PurchaseOrders, WorkTeams, $mdDialog, $mdToast) {
        $scope.searchClient = '';
        $scope.sortType = 'name';
        $scope.sortReverse = false;
        $scope.authentication = Authentication;
        $scope.purchaseOrder = {};
        $scope.workTeam = {};
        $scope.purchaseOrders = PurchaseOrders.query();
        $scope.workTeams = WorkTeams.query();

        $scope.newClient = {
            name: "",
            taxId: "",
            phone: "",
            email: "",
            url: "",
            contact: {
                name: "",
                officePhone: "",
                cellPhone: "",
                email: ""
            },
            address: {
                city: "",
                state: "",
                country: "",
                zipCode: "",
                street: "",
                colony: "",
                lot: "",
                crosses: ""
            },
            workTeams: [],
            purchaseOrders: []
        };

        $scope.create = function (isValid) {
            console.log('Llegue');
            $scope.error = null;

            if (!isValid) {
                console.log("error");
                $scope.$broadcast('show-errors-check-validity', 'clientForm');

                return false;
            }

            var client = new Clients({
                name: $scope.newClient.name,
                taxId: $scope.newClient.taxId,
                phone: $scope.newClient.phone,
                email: $scope.newClient.email,
                url: $scope.newClient.url,
                contact: $scope.newClient.contact,
                address: $scope.newClient.address,
                workTeams: $scope.newClient.workTeams,
                purchaseOrders: $scope.newClient.purchaseOrders
            });

            client.$save(function (response) {
                $location.path('clients/' + response._id);
            }, function (errorResponse) {
                console.log('fail');
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.clients = Clients.query();
        };

        $scope.findOne = function () {
            Clients.get(
                {clientId: $stateParams.clientId},
                function (client) {
                    $scope.client = client;
                    $scope.purchaseOrders = $scope.purchaseOrders.filter(function (item) {
                        var shouldAddItemToList = true;

                        angular.forEach($scope.client.purchaseOrders, function (purchaseOrder, key) {
                            if (purchaseOrder._id == item._id) {
                                shouldAddItemToList = false;
                            }
                        });

                        return shouldAddItemToList;
                    });
                    $scope.workTeams = $scope.workTeams.filter(function (item) {
                        var shouldAddItemToList = true;

                        angular.forEach($scope.client.workTeams, function (workTeam, key) {
                            if (workTeam._id == item._id) {
                                shouldAddItemToList = false;
                            }
                        });

                        return shouldAddItemToList;
                    });
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.update = function () {
            var client = $scope.client;

            client.$update(function () {
                $location.path('clients/' + client._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function () {
            if ($scope.client) {
                $scope.client.$remove(function () {
                    $location.path('clients/list');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Cliente eliminado')
                            .hideDelay(3000)
                    );
                });

                for (var i in $scope.clients) {
                    if ($scope.clients[i] === client) {
                        $scope.clients.splice(i, 1);
                    }
                }
            }
        };

        $scope.addWorkTeam = function () {
            if ($scope.workTeam) {
                $scope.client.workTeams.push($scope.workTeam);
                $scope.workTeam = {};
                $scope.workTeams = $scope.workTeams.filter(function (item) {
                    return !$scope.client.workTeams.includes(item);
                });

                $scope.update();
                $scope.findOne();
            }
        };

        $scope.removeWorkTeam = function (workTeam) {
            $scope.workTeams.push(workTeam);
            $scope.client.workTeams = $scope.client.workTeams.filter(function (item) {
                return item != workTeam;
            });

            $scope.update();
            $scope.findOne();
        }

        $scope.addPurchaseOrder = function () {
            if ($scope.client) {
                $scope.client.purchaseOrders.push($scope.purchaseOrder);
                $scope.purchaseOrder = {};
                $scope.purchaseOrders = $scope.purchaseOrders.filter(function (item) {
                    return !$scope.client.purchaseOrders.includes(item);
                });

                $scope.update();
                $scope.findOne();
            }
        };

        $scope.removePurchaseOrder = function (purchaseOrder) {
            $scope.purchaseOrders.push(purchaseOrder);
            $scope.client.purchaseOrders = $scope.client.purchaseOrders.filter(function (item) {
                return item != purchaseOrder;
            });

            $scope.update();
            $scope.findOne();
        };

        $scope.showConfirmDialog = function (event) {
            var confirm = $mdDialog.confirm()
                .title('¿Desea eliminar a este cliente?')
                .targetEvent(event)
                .ok('Aceptar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                $scope.remove();
            });
        };
    }
]);