'use strict';

// ResourceTypes controller
angular.module('resourceTypes')
    .controller('ResourceTypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ResourceTypes',
        function ($scope, $stateParams, $location, Authentication, ResourceTypes) {
            $scope.authentication = Authentication;
            $scope.newResourceType = {
                name : null,
                rates: []
            };
            $scope.newRate = {
                level : 0,
                name : null,
                description : null,
                qualities : [],
                rate : 0.0
            };

            $scope.addRate = function(){
                $scope.newResourceType.rates.push($scope.newRate);
                $scope.newRate = {
                    level : 0,
                    name : null,
                    description : null,
                    qualities : [],
                    rate : 0.0
                };
            };

            $scope.deleteRate = function(toDeleteRate){
              $scope.newResourceType.rates = $scope.newResourceType.rates.filter(function(current){
                  return current !== toDeleteRate;
              });
            };
            // Create new ResourceType
            $scope.create = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'resourceTypeForm');

                    return false;
                }

                // Create new ResourceType object
                var resourceType = new ResourceTypes({
                    name: $scope.newResourceType.name,
                    rates: $scope.newResourceType.rates
                });

                // Redirect after save
                resourceType.$save(function (response) {
                    $location.path('resource-types/' + response._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Remove existing ResourceType
            $scope.remove = function (resourceType) {
                if (resourceType) {
                    resourceType.$remove();

                    for (var i in $scope.resourceTypes) {
                        if ($scope.resourceTypes[i] === resourceType) {
                            $scope.resourceTypes.splice(i, 1);
                        }
                    }
                } else {
                    $scope.resourceType.$remove(function () {
                        $location.path('resource-types/');
                    });
                }
            };

            // Update existing ResourceType
            $scope.update = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'resourceTypeForm');

                    return false;
                }

                var resourceType = $scope.resourceType;

                resourceType.$update(function () {
                    $location.path('resource-types/' + resourceType._id);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            // Find a list of ResourceTypes
            $scope.find = function () {
                $scope.resourceTypes = ResourceTypes.query();
            };

            // Find existing ResourceType
            $scope.findOne = function () {
                $scope.resourceType = ResourceTypes.get({
                    resourceTypeId: $stateParams.resourceTypeId
                });
                console.log("poffy");
            };
        }
    ]);
