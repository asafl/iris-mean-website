'use strict';

angular.module('irisBenadoArchitectsApp')
	.directive('showSpaceNameOnHover', function () {
		return {
			restrict: 'EA',
			link: function (scope, element, attrs) {
				element.bind('mouseenter', function () {
					//flipOutX
					$(element).children('.' + attrs.hoverItemClass).removeClass('slideOutDown').css('display', 'block').addClass('slideInUp');
				});
				element.bind('mouseleave', function () {
					$(element).children('.' + attrs.hoverItemClass).addClass('slideOutDown');
				});
			}
		};
	})
	.directive('showBeforePane', function () {
		return {
			restrict: 'EA',
			link: function (scope, element) {
				element.bind('click', function () {
					if ($('.before-pics').hasClass('slideOutUp')) { // it's out of view - show it
						$('.before-pics').removeClass('slideOutUp').css('display', 'block').addClass('slideInDown');
					} else { // it's currently shown, hide it
						$('.before-pics').addClass('slideOutUp');
					}
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