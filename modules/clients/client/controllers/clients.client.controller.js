'use strict';

angular.module('clients').controller('ClientsController', [
    '$scope',
    '$stateParams',
    '$location',
    'Authentication',
    'Clients',
    'PurchaseOrders',
    '$mdDialog',
    '$mdToast',
    function ($scope, $stateParams, $location, Authentication, Clients, PurchaseOrders, $mdDialog, $mdToast) {
        $scope.searchClient = '';
        $scope.sortType = 'name';
        $scope.sortReverse = false;
        $scope.authentication = Authentication;
        $scope.purchaseOrder = {};
        $scope.purchaseOrders = PurchaseOrders.query();

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
            /* TODO */
        };

        $scope.addPurchaseOrder = function () {
            if ($scope.client) {
                $scope.client.purchaseOrders.push($scope.purchaseOrder);
                $scope.purchaseOrder = {};
                $scope.purchaseOrders = $scope.purchaseOrders.filter(function (item) {
                    return !$scope.client.purchaseOrders.includes(item);
                });

                $scope.update();
            }
        };

        $scope.showConfirm = function (event) {
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