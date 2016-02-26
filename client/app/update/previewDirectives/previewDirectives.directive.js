'use strict';

angular.module('irisBenadoArchitectsApp')
	.directive('showSpaceNameOnHover', function () {
		return {
			restrict: 'EA',
			link: function (scope, element, attrs) {
				element.bind('mouseenter', function () {
					$(element).children('.' + attrs.hoverItemClass).removeClass('flipOutX').css('display', 'block').addClass('flipInX');
				});
				element.bind('mouseleave', function () {
					$(element).children('.' + attrs.hoverItemClass).addClass('flipOutX');
				});
			}
		};
	})
	.directive('showBeforePane', function () {
		return {
			restrict: 'EA',
			link: function (scope, element) {
				element.bind('click', function () {
					$('.before-pics').removeClass('slideOutUp').css('display', 'block').addClass('slideInDown');
				});
			}
		};
	})
	.directive('hideBeforePane', function () {
		return {
			restrict: 'EA',
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					element.bind('mouseleave', function () {
						$('.before-pics').addClass('slideOutUp');
					});
				});
			}
		};
	})
	.directive('verticallyCenterToParent' , function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				function setupOffset () {
					var thisElementHeight = $(element).height();
					element.attr('style', 'margin-top: ' + ($(element).parent().height() - thisElementHeight)/2 + 'px');
				}

				//// runs on scope variable 'heights' change
				//scope.$watch('heights', function() {
				//	//centering the element
				//	setupOffset();
				//},true);

				// runs on this (where the directive is) element height change
				scope.$watch(function() {
					$timeout(function () { // To ensure it runs after finished rendering
						scope.tempHeight = $(element).height();
						setupOffset();
					}, 100);
				});
			}
		}
	});