'use strict';

// Work Teams controller
angular.module('workTeams')
    .controller('WorkTeamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'WorkTeams', 'Employees',
        function ($scope, $stateParams, $location, Authentication, WorkTeams, Employees) {
            $scope.authentication = Authentication;
            $scope.newWorkTeam = {
                name : null,
                description : null,
                tecnologies : [],
                leader : {
                    name : null,
                    phone : null,
                    office : null,
                    cellphone : null,
                    email : null
                },
                architect : {
                    name : null,
                    phone : null,
                    office : null,
                    cellphone : null,
                    email : null
                },
                employees : [],
                employeeLeader : {}
            };
            $scope.selectedEmployee = {};
            $scope.employeeLeader = {};
            $scope.employeesIntegrants = Employees.query();
            $scope.employeesLeader = Employees.query();

            $scope.addIntegrant = function(){
                if(!$scope.newWorkTeam.employees.includes($scope.selectedEmployee)){
                    $scope.newWorkTeam.employees.push($scope.selectedEmployee);
                }
                $scope.employeesIntegrants = $scope.employeesIntegrants.filter(function(item){
                    return !$scope.newWorkTeam.employees.includes(item);
                });
            };

            $scope.setLeader = function(){
                $scope.newWorkTeam.employeeLeader = $scope.employeeLeader;
            };

            $scope.deleteIntegrant = function(toDeleteIntegrant){
                $scope.newWorkTeam.employees = $scope.newWorkTeam.employees.filter(function(item){
                    return item != toDeleteIntegrant;
                });
                $scope.employeesIntegrants.push(toDeleteIntegrant);
            };
            // Create new WorkTeam
            $scope.create = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'workTeamForm');

                    return false;
                }

                // Create new WorkTeam object
                var workTeam = new WorkTeams($scope.newWorkTeam);
                console.log($scope.newWorkTeam);

                // Redirect after save
                workTeam.$save(function (response) {
                    $location.path('work-teams/' + response._id);
                }, function (errorResponse) {
                    console.log(errorResponse);
                    $scope.error = errorResponse.data.message;
                });
            };

            // Remove existing WorkTeam
            $scope.remove = function (workTeam) {
                if (workTeam) {
                    workTeam.$remove(function () {
                        $location.path('work-teams');
                    });

                    for (var i in $scope.workTeams) {
                        if ($scope.workTeams[i] === workTeam) {
                            $scope.workTeams.splice(i, 1);
                        }
                    }
                }
            };

            // Update existing WorkTeam
            $scope.update = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'workTeamForm');

                    return false;
                }

                var workTeam = $scope.newWorkTeam;

                workTeam.$update(function () {
                    $location.path('work-teams/' + workTeam._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Find a list of WorkTeams
            $scope.find = function () {
                $scope.workTeams = WorkTeams.query();

            };

            // Find existing WorkTeam
            $scope.findOne = function () {
                $scope.workTeam = WorkTeams.get({
                    workTeamId: $stateParams.workTeamId
                });
                $scope.newWorkTeam = $scope.workTeam;
                $scope.employeesIntegrants = $scope.employeesIntegrants.filter(function(item){
                    return !$scope.newWorkTeam.employees.includes(item);
                });
            };
        }
    ]);
