'use strict';

angular.module('irisBenadoArchitectsApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('spaces', {
				url: '/spaces',
				templateUrl: 'app/spaces/spaces.html',
				controller: 'SpacesCtrl'
			})
			.state('single_space', {
				url: '/spaces/:id',
				templateUrl: 'app/spaces/single_space.html',
				controller: 'SingleSpaceCtrl'
			});
	});