'use strict';

angular.module('customers').controller('CustomersListController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Customers',
    function ($scope, $stateParams, $location, $filter, Authentication, Customers) {
        $scope.authentication = Authentication;

        $scope.find = function () {
            $scope.customers = Customers.query();
        };

        $scope.remove = function (customerId) {
            Customers.delete(
                {customerId: customerId},
                function () {
                    $scope.customers = $filter('filter')($scope.customers, function (customer) {
                        return customer._id !== customerId;
                    });
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                    console.log($scope.error);
                }
            )
        };
    }
]);