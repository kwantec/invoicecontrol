(function () {
	'use strict';
	angular
		.module('userGroups')
		.directive('keyboardPoster', function ($parse, $timeout) {
			var DELAY_TIME_BEFORE_POSTING = 3000;
			return function(scope, elem, attrs) {
				var element = angular.element(elem)[0];
				var currentTimeout = null;
				element.onkeydown = function () {
					var model = $parse(attrs.postFunction);
					var poster = model(scope);
					if (currentTimeout) {
						$timeout.cancel(currentTimeout);
					}
					currentTimeout = $timeout(function() {
						poster();
					}, DELAY_TIME_BEFORE_POSTING);
				};
			};
		});
}());