/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);

    EmployeesClientController.$inject = ['$scope', '$resource', '$stateParams', 'Employees', '$location'];

    function EmployeesClientController($scope, $resource, $stateParams, Employees, $location) {
        $scope.newEmployee = {};
        $scope.newEmployee.name = "";
        $scope.newEmployee.lastName = "";
        $scope.newEmployee.salary = "";

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
            Employees.get({
                employeeId: $stateParams.employeeId
            }, function(employee){
                employee.dob = new Date(employee.dob);
                $scope.employee = employee;
            });
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
