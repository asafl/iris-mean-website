'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('NavbarCtrl', function ($scope, $state, spacesService) {

		$scope.menu = [
			{
				'title': 'Spaces',
				'state': '.',
				'subMenu': []
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
			// first push the "all" object
			$scope.menu[0].subMenu.push({
				name: 'All',
				_id: ''
			});

			spaces.forEach(function (space) {
				$scope.menu[0].subMenu.push({
					name: space.name,
					_id: '/' + space._id
				});
			});

		});

		$scope.isCollapsed = false;

		$scope.isActive = function (state) {
			return state === $state.current.name;
		};
	});