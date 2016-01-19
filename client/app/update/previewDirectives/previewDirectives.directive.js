'use strict';

angular.module('irisBenadoArchitectsApp')
	.directive('showSpaceNameOnHover', function () {
		return {
			restrict: 'EA',
			link: function (scope, element) {
				element.bind('mouseenter', function () {
					$(element).children('.overlay-text').removeClass('slideOutDown');
					$(element).children('.overlay-text').css('display', 'block');
					$(element).children('.overlay-text').addClass('slideInUp');
				});
				element.bind('mouseleave', function () {
					$(element).children('.overlay-text').addClass('slideOutDown');
				});
			}
		};
	});