/**
 * Created by Andre on 31/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesListClientController', EmployeesListClientController);
    EmployeesListClientController.$inject = ['$scope', '$resource', '$filter', '$mdToast', 'Employees'];

    function EmployeesListClientController($scope, $resource, $filter, $mdToast, Employees) {
        var Employee = $resource('/api/employees');
        $scope.employees = Employee.query();

        $scope.removeEmployee = function (employeeId) {
            Employees.delete(
                {employeeId: employeeId},
                function () {
                    $scope.employees = $filter('filter')($scope.employees, function(employee) {
                        return employee._id !== employeeId;
                    });

                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Employee Succesfully Deleted!')
                            .hideDelay(3000)
                    );
                },
                function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };
    }
}());
