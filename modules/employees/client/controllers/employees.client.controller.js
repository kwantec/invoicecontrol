/**
 * Created by Andre on 29/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesClientController', EmployeesClientController);
    EmployeesClientController.$inject = ['$scope','$resource'];

    function EmployeesClientController($scope,$resource) {
        $scope.newEmployee = {};
        $scope.newEmployee.name = "";
        $scope.newEmployee.lastName = "";
        $scope.newEmployee.Salary = "";

        var Employee = $resource('/api/employees');
        $scope.addEmployee = function () {
            //Employee.$save();
        }

    }

}());