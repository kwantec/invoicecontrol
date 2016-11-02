'use strict';

//Employees service used for communicating with the articles REST endpoints
// angular.module('employees').factory('Employees', ['$resource',
//   function ($resource) {
//     return $resource('api/employees/:employeeId', {
//       articleId: '@_id'
//     }, {
//       update: {
//         method: 'PUT'
//       }
//     });
//   }
// ]);

( function () {
  'use strict';

  angular.module('employees').factory('EmployeesService', ['$http', EmployeesService]);

  function EmployeesService($http){
    return {
      getEmployees: getEmployees,
      createEmployee: createEmployee
    }

    function getEmployees(){
      return $http({method: 'GET', url: 'http://localhost:3000/api/employees'});
    }

    function createEmployee(employee) {
      // return $http.post('http://localhost:3000/api/employees', employee);
      return $http({ method: 'POST', data: employee, url: 'http://localhost:3000/api/employees' });
    }
  }

} )();
