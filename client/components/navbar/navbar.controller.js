'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('NavbarCtrl', function ($scope, $state, spacesService, $timeout) {

		//$timeout(function () { // wait for a second and then check current state
		//	if ($state.current.name == 'update') {
		//		//
		//	}
		//}, 10);


		$scope.menu = [
			{
				'title': 'Spaces',
				'state': ''
			},
			{
				'title': 'About',
				'state': 'about'
			},
			{
				'title': 'Contact',
				'state': 'contact'
			}
		];


		spacesService.loadAllSpaces1Pic().then(function (spaces) {
			// Create the array and push the "all" object
			$scope.spacesSubMenu = [
				{
					name: 'All',
					state: 'spaces'
				}
			];

			spaces.forEach(function (space) {
				$scope.spacesSubMenu.push({
					name: space.name,
					state: 'single_space({id: "' + space._id + '"})'
				});
			});

		});

		$scope.isCollapsed = false;

		$scope.isActive = function (state) {
			return state === $state.current.name;
		};
	});