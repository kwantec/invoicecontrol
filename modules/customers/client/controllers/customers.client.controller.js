'use strict';

angular.module('customers').controller('CustomersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Customers',
    function ($scope, $stateParams, $location, Authentication, Customers) {
        $scope.authentication = Authentication;
        $scope.sortType = 'name';
        $scope.sortReverse = false;
        $scope.searchCustomer = '';

        $scope.newCustomer = {
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
                $scope.$broadcast('show-errors-check-validity', 'customerForm');

                return false;
            }

            var customer = new Customers({
                name: $scope.newCustomer.name,
                taxId: $scope.newCustomer.taxId,
                phone: $scope.newCustomer.phone,
                email: $scope.newCustomer.email,
                url: $scope.newCustomer.url,
                contact: $scope.newCustomer.contact,
                address: $scope.newCustomer.address,
                workTeams: $scope.newCustomer.workTeams,
                purchaseOrders: $scope.newCustomer.purchaseOrders
            });

            customer.$save(function (response) {
                $location.path('customers/' + response._id);
            }, function (errorResponse) {
                console.log('fail');
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.addWorkTeam = function () {
            /* TODO */
        };

        $scope.addPurchaseOrder = function () {
            /* TODO */
        };

        $scope.find = function () {
            $scope.customers = Customers.query();
        };

        $scope.findOne = function () {
            Customers.get(
                {customerId: $stateParams.customerId},
                function (customer) {
                    $scope.customer = customer;
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.update = function () {
            var customer = $scope.customer;
            customer.$update(function () {
                $location.path('customers/' + customer._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function () {
            $scope.customer.$delete(
                {customerId: $stateParams.customerId},
                function () {
                    $location.path('customers/list');
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.clearValue = function () {

        };
    }
]);