'use strict';

angular.module('clients').controller('ClientsListController', ['$scope', '$stateParams', '$location', '$filter', 'Authentication', 'Clients',
    function ($scope, $stateParams, $location, $filter, Authentication, Clients) {
        $scope.authentication = Authentication;

        $scope.find = function () {
            $scope.clients = Clients.query();
        };

        $scope.remove = function (clientId) {
            Clients.delete(
                {clientId: clientId},
                function () {
                    $scope.clients = $filter('filter')($scope.clients, function (client) {
                        return client._id !== clientId;
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