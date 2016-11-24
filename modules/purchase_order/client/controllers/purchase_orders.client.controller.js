'use strict';

angular.module('purchaseOrders').controller('PurchaseOrdersController', ['$scope', '$stateParams', '$location', 'Authentication', 'PurchaseOrders',
    function ($scope, $stateParams, $location, Authentication, PurchaseOrders) {
        $scope.authentication = Authentication;
        /*
        $scope.sortType = 'name';
        $scope.sortReverse = false;
        $scope.searchCustomer = '';
        */

        $scope.newPurchaseOrder = {
            purchaseNumber: "",
            name: "",
            description: "",
            assignedAmount: "",
            remainingAmount: "",
        };

        $scope.create = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                console.log("error");
                //$scope.$broadcast('show-errors-check-validity', 'customerForm');

                return false;
            }

            var purchaseOrder = new PurchaseOrders({
                purchaseNumber: $scope.newPurchaseOrder.purchaseNumber,
                name: $scope.newPurchaseOrder.name,
                description: $scope.newPurchaseOrder.description,
                assignedAmount: $scope.newPurchaseOrder.assignedAmount,
                remainingAmount: $scope.newPurchaseOrder.remainingAmount
            });

            purchaseOrder.$save(function (response) {
                $location.path('purchase-orders/' + response._id);
            }, function (errorResponse) {
                console.log('fail');
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
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };
    }
]);