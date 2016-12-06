'use strict';

// ResourceTypes controller
angular.module('resourceTypes')
    .controller('ResourceTypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'ResourceTypes', '$mdDialog',
        function ($scope, $stateParams, $location, Authentication, ResourceTypes, $mdDialog) {
            $scope.authentication = Authentication;

            // Create new ResourceType
            $scope.create = function (isValid) {
                $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'resourceTypeForm');

                    return false;
                }

                // Create new ResourceType object
                var resourceType = new ResourceTypes({
                    name: $scope.resourceType.name,
                    rate: $scope.resourceType.rate
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
                    resourceType.$remove(function () {
                        $location.path('resource-types');
                    });

                    for (var i in $scope.resourceTypes) {
                        if ($scope.resourceTypes[i] === resourceType) {
                            $scope.resourceTypes.splice(i, 1);
                        }
                    }
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
            };

            $scope.showConfirmDialog = function(current) {
                var confirm = $mdDialog.confirm()
                    .title('¿Realmente deseas eliminar este tipo de recurso?')
                    .textContent('Después de esta acción el tipo de recurso seleccionado ya no sera visible')
                    .ok('Si')
                    .cancel('No');

                $mdDialog.show(confirm).then(function() {
                    $scope.remove(current);
                });
            };

            $scope.resetResourceType = function(){
                $scope.resourceType = {
                    name : null,
                    rate: {
                        level : null,
                        name : null,
                        qualities : [],
                        description : null
                    }
                };
            }
        }
    ]);
