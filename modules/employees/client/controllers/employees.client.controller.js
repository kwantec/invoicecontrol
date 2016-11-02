'use strict';

// Employees controller
angular.module('employees').controller('EmployeesController', ['$scope', '$http', 'EmployeesService',
  function ($scope, $http, EmployeesService) {
    // $scope.authentication = Authentication;

    /**
     * Find all the employees
     */
    // $scope.find = function(){
    //   console.log("resource: ", Employees.query());
    //   $scope.employees = Employees.query();
    // }

    EmployeesService.getEmployees().then(function(response){
      console.log("éxito", response);
      $scope.employees = response.data;
    }).catch(function (err) {
      console.log("err", err);
    });

    $scope.employee = {};
    $scope.clickedSubmit = function () {
      // EmployeesService.createEmployee($scope.employee);
      EmployeesService.createEmployee($scope.employee).then(function(response){
        console.log("éxito", response);
      }).catch(function(err) {
        console.log("err", err);
      });
    }
  }
]);
