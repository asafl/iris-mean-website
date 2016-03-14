'use strict';

angular.module('irisBenadoArchitectsApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ui.router',
		'ui.bootstrap',
		'ngFileUpload',
		'gridster',
		'bootstrapLightbox'
	])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
			.otherwise('/spaces');

		$locationProvider.html5Mode(true);
	})
	.config(function (LightboxProvider) {
		//LightboxProvider.templateUrl = '../components/lightbox/lightbox.html'; USED INLINE IN FILE INSTEAD

		LightboxProvider.getImageUrl = function (image) {
			return 'data:image/jpeg;base64,' + image.img;
		};

		LightboxProvider.getImageCaption = function (image) {
			return image.info;
		};

		LightboxProvider.getImageCredits = function (image) {
			return image.credits;
		}
	});
