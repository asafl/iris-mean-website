'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('SingleSpaceCtrl', function ($scope, $stateParams, spacesService, Lightbox) {
		// isolating a single space controller... should sometime make it prettier

		$scope.gridsterOpts = {
			resizable: {
				enabled: false
			},
			draggable: {
				enabled: false
			},
			rowHeight: 50,
			margins: [10,10]
		};

		// this is a showcase of all pics a single space - THIS IS NOT A PREVIEW CONTROLLER
		spacesService.loadAllSpacesWithImages().then(function (res) {

			// different parameters for main view and for separate space view (one's position and sizes for all spaces, the other for single)
			$scope.customItemMap = {
				sizeX: 'image.sizeX',
				sizeY: 'image.sizeY',
				row: 'image.row',
				col: 'image.col'
			};

			//$scope.space = res;
			$scope.space = _.find(res, { _id: $stateParams.id});

			$scope.afterImages = _.filter($scope.space.images, { 'before': false });
			$scope.beforeImages = _.filter($scope.space.images, { 'before': true });
		});

		$scope.openLightboxModal = function (array, index) {
			Lightbox.openModal(array, index);
		};

		// to prevent error from gridster item (this code normally would handle moving and resizing of tiles of the gridster).
		$scope.updateImage = function () { };
	});
