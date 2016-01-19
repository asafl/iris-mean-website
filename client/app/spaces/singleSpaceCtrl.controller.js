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
			}
		};


		// this is a preview of a single space
		spacesService.loadSpace($stateParams.id).then(function (res) {
			// different parameters for main view and for separate space view
			$scope.customItemMap = {
				sizeX: 'image.sizeX',
				sizeY: 'image.sizeY',
				row: 'image.row',
				col: 'image.col'
			};

			$scope.space = res;
			//$scope.items = res.data.images;
		});

		$scope.openLightboxModal = function (index) {
			Lightbox.openModal($scope.space.images, index);
		};

		// to prevent error from gridster item (this code normally would handle moving and resizing of tiles of the gridster).
		$scope.updateImage = function () { };
	});
