'use strict';

// Work Teams controller
angular.module('workTeams')
    .controller('WorkTeamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'WorkTeams', 'Employees',
        function ($scope, $stateParams, $location, Authentication, WorkTeams, Employees) {
            $scope.authentication = Authentication;
            $scope.employees = Employees.query();
            $scope.integrant = {};

            $scope.addIntegrant = function(){
                $scope.workTeam.employees.push($scope.integrant);
                $scope.integrant = {};
                $scope.employees = $scope.employees.filter(function(item){
                    return !$scope.workTeam.employees.includes(item);
                });
            };

            $scope.setLeader = function(employee){
                $scope.workTeam.employeeLeader = employee;
            };

            $scope.deleteIntegrant = function(toDeleteIntegrant){
                $scope.employees.push(toDeleteIntegrant);
                $scope.workTeam.employees = $scope.workTeam.employees.filter(function(item){
                    return item != toDeleteIntegrant;
                });
                if($scope.workTeam.employeeLeader == toDeleteIntegrant){
                    $scope.workTeam.employeeLeader = {};
                }
            };
            // Create new WorkTeam
            $scope.create = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'workTeamForm');

                    return false;
                }

                // Create new WorkTeam object
                var workTeam = new WorkTeams($scope.workTeam);

                // Redirect after save
                workTeam.$save(function (response) {
                    $location.path('work-teams/' + response._id);
                }, function (errorResponse) {
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

                var workTeam = $scope.workTeam;

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

                $scope.employees = $scope.employees.filter(function(item){
                    return !$scope.workTeam.employees.includes(item);
                });
            };

            $scope.resetWorkTeam = function(){
                $scope.workTeam = {
                    name : null,
                    description : null,
                    technologies : [],
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
            };
        }
    ]);
