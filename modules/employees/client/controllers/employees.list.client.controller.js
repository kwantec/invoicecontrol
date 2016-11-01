/**
 * Created by Andre on 31/10/2016.
 */
(function () {
    'use strict';
    angular
        .module('employees')
        .controller('EmployeesListClientController', EmployeesListClientController);
    EmployeesListClientController.$inject = ['$scope','$resource'];

    function EmployeesListClientController($scope,$resource) {
        var Employee = $resource('/api/employees');
        $scope.employees = function () {
         Employee.query();
        }
    }

}());