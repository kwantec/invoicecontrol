/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);

    EmployeesClientController.$inject = ['$scope', '$resource', '$stateParams', 'Employees', '$location', '$timeout'];

    function EmployeesClientController($scope, $resource, $stateParams, Employees, $location, $timeout) {
        $scope.newEmployee = {};
        $scope.newEmployee.name = "";
        $scope.newEmployee.lastName = "";
        $scope.newEmployee.salary = "";

        $scope.employee = {
            name : "",
            lastName : "",
            salary : 0,
            dob : new Date()
        };

        var Employee = $resource('/api/employees');

        $scope.addEmployee = function () {
            Employee.save($scope.newEmployee, function () {
                $scope.newEmployee = {};
                $scope.newEmployee.name = "";
                $scope.newEmployee.lastName = "";
                $scope.newEmployee.salary = "";
            });
        };

        $scope.findEmployee = function () {
            var employee = Employees.get({
                employeeId: $stateParams.employeeId
            });
            $timeout(function(){
                employee.dob = new Date(employee.dob);
                $scope.employee = employee;
            }, 0);
        };

        $scope.update = function(){
            var employee = $scope.employee;

            employee.$update(function () {
                $location.path('employees/' + employee._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.removeEmployee = function () {
            $scope.employee.$delete({employeeId: $stateParams.employeeId}, function () {
                $location.path('employees/list');
            });
        };
    }
}());
