(function () {
  'use strict';

  angular.module('employees').factory('EmployeesService', ['$http', EmployeesService]);

  function EmployeesService($http){
    return {
      createEmployee: createEmployee,
      findEmployee: findEmployee
    };

    function createEmployee(employee) {
      return $http({ method: 'POST', data: employee, url: 'http://localhost:3000/api/employees' });
    }

    function findEmployee(id) {
      return $http({ method: 'GET', url: 'http://localhost:3000/api/employees/' + id });
    }
  }

})();
