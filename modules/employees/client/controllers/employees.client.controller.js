/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);

    EmployeesClientController.$inject = ['$scope', '$resource', '$stateParams', 'Employees'];

    function EmployeesClientController($scope, $resource, $stateParams, Employees) {
        $scope.newEmployee = {};
        $scope.newEmployee.name = "";
        $scope.newEmployee.lastName = "";
        $scope.newEmployee.Salary = "";

        var Employee = $resource('/api/employees');

        $scope.addEmployee = function () {
            Employee.save($scope.newEmployee, function () {
                $scope.newEmployee = {};
                $scope.newEmployee.name = "";
                $scope.newEmployee.lastName = "";
                $scope.newEmployee.Salary = "";
            });
        }

        $scope.findEmployee = function () 
            $scope.employee = Employees.get({
                employeeId: $stateParams.employeeId
            });
        };
    }
}());
