/**
 * Created by Andre on 31/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesListClientController', EmployeesListClientController);
    EmployeesListClientController.$inject = ['$scope', '$resource', 'Employees'];

    function EmployeesListClientController($scope, $resource, Employees) {
        var Employee = $resource('/api/employees');
        $scope.employees = Employee.query();

        $scope.removeEmployee = function (employeeId) {
            Employees.delete({employeeId: employeeId}).exec();

            for (var i in $scope.employees) {
                if ($scope.employees[i].employeeId === employeeId) {
                    $scope.employees.splice(i, 1);
                }
            }
        };
    }
}());
