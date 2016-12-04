'use strict';

angular.module('purchaseOrders').controller('PurchaseOrdersController', [
    '$scope',
    '$stateParams',
    '$location',
    'Authentication',
    'PurchaseOrders',
    'Clients',
    '$mdDialog',
    '$mdToast',
    function ($scope, $stateParams, $location, Authentication, PurchaseOrders, Clients, $mdDialog, $mdToast) {
        $scope.authentication = Authentication;
        $scope.client = {};
        $scope.clients = Clients.query();

        $scope.newPurchaseOrder = {
            purchaseNumber: "",
            name: "",
            description: "",
            assignedAmount: 0,
            remainingAmount: 0,
            client: ""
        };

        $scope.create = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'purchaseOrderForm');

                return false;
            }

            var purchaseOrder = new PurchaseOrders({
                purchaseNumber: $scope.newPurchaseOrder.purchaseNumber,
                name: $scope.newPurchaseOrder.name,
                description: $scope.newPurchaseOrder.description,
                assignedAmount: $scope.newPurchaseOrder.assignedAmount,
                remainingAmount: $scope.newPurchaseOrder.remainingAmount,
                client: $scope.newPurchaseOrder.client._id
            });

            purchaseOrder.$save(function (response) {
                $location.path('purchase-orders/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.purchaseOrders = PurchaseOrders.query();
        };

        $scope.findOne = function () {
            PurchaseOrders.get(
                {purchaseOrderId: $stateParams.purchaseOrderId},
                function (purchaseOrder) {
                    $scope.purchaseOrder = purchaseOrder;
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.update = function () {
            var purchaseOrder = $scope.purchaseOrder;
            purchaseOrder.$update(function () {
                $location.path('purchase-orders/' + purchaseOrder._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function () {
            $scope.purchaseOrder.$delete(
                {purchaseOrderId: $stateParams.purchaseOrderId},
                function () {
                    $location.path('purchase-orders/list');
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Orden de compra eliminada')
                            .hideDelay(3000)
                    );
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.showConfirmDialog = function (event) {
            var confirm = $mdDialog.confirm()
                .title('¿Desea eliminar esta orden de compra?')
                .targetEvent(event)
                .ok('Aceptar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                $scope.remove();
            });
        };

        $scope.setRemainingAmount = function () {
            if ($scope.purchaseOrderForm.remainingAmount.$untouched) {
                $scope.newPurchaseOrder.remainingAmount = $scope.newPurchaseOrder.assignedAmount;
            }
        }
    }
]);