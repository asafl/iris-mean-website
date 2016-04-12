'use strict';

angular.module('irisBenadoArchitectsApp')
	.directive('heightToWindow', function ($window) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				var w = angular.element($window);
				// setup a function that returns an object with current height and width
				scope.getWindowDimensions = function () {
					return {'h': w.height(), 'w': w.width()};
				};
				// check for changes in window dimensions on every digest cycle
				scope.$watch(scope.getWindowDimensions, function (newValue) {
					element.attr('style', 'height: ' + (newValue.h - 0.1 * newValue.h) + 'px');
				}, true);
			}
		};
	})
	.directive('beforeBackground', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				$timeout(function () {
					element.attr('style', 'height: ' + $(element).parent().height() + 'px');
				},0);
			}
		};
	});