(function () {
  'use strict';

  angular
    .module('loggies')
    .controller('LoggiesListController', LoggiesListController);

  LoggiesListController.$inject = ['LoggiesService', '$scope', '$state', '$filter', '$http', '$q', '$location', '$timeout'];

  function LoggiesListController(LoggiesService, $scope, $state, $filter, $http, $q, $location, $timeout) {
    var vm = this;

    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = [];

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
      console.log("You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z"));

    };

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.setDayContent = function(date) {

      // You would inject any HTML you wanted for
      // that particular date here.
      return "<p></p>";

      // You could also use an $http function directly.
      return $http.get("/some/external/api");

      // You could also use a promise.
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve("<p></p>");
      }, 1000);
      return deferred.promise;

    };

    vm.loggies = LoggiesService.query();

    $scope.dayFormat = "d";

    // To select a single date, make sure the ngModel is not an array.
    $scope.selectedDate = null;

    // If you want multi-date select, initialize it as an array.
    $scope.selectedDate = null;

    $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      var loggyDate = $filter("date")(date, 'yyyy-MM-dd');
      var tam = vm.loggies.length;
      var i;
      var dater = $filter("date")(date, 'MMM d, y');
      for (i=0 ; i < tam; i++) {
        if(vm.loggies[i] == undefined) {

        }else{
          vm.loggies[i].created = $filter("date")(vm.loggies[i].created, 'MMM d, y');
          if (vm.loggies[i].created == dater) {
            $state.go('loggies.view', {
              loggyId: vm.loggies[i]._id
            });
            return ;
          }
        }
      }
      $state.go('loggies.create', {
        loggyDate: loggyDate
      });
    };

    $scope.prevMonth = function(data) {
      $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
    };

    $scope.nextMonth = function(data) {
      $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    };

    $scope.tooltips = true;
    $scope.setDayContent = function(date) {
      // You would inject any HTML you wanted for
      // that particular date here.
      //return "<p>" + vm.loggies[0] + "</p>";

      // You could also use an $http function directly.
      //return $http.get("/some/external/api");

      // You could also use a promise.
      var deferred = $q.defer();
      $timeout(function() {
        var tam = vm.loggies.length;
        var i;
        var dater = $filter("date")(date, 'MMM d, y');
        for (i=0 ; i < tam; i++) {
          if(vm.loggies[i] == undefined) {

          }else{
            vm.loggies[i].created = $filter("date")(vm.loggies[i].created, 'MMM d, y');
            if (vm.loggies[i].created == dater) {
              deferred.resolve("<p class='colorFont'><i class='fa fa-check-square-o fa-3x' aria-hidden='true'></i></p>");
            }
          }
        }
      }, 1000);
      return deferred.promise;

    };
  }
}());
