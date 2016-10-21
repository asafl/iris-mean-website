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
			columns: 40,
			margins: [10,10]
		};

		$scope.beforeOpen = false;

		$scope.$on('gridster-resized', function(sizes, gridster) {
			// adjust sizes

		});

		$scope.afterImages = [];
		$scope.beforeImages = [];

		// Loading images one by one
		spacesService.getAllImagesForSpaceOneByOne($stateParams.id).then(function (spaceDetails) {
			// different parameters for main view a for separate space view (one's position and sizes for all spaces, the other for single)
			$scope.customItemMap = {
				sizeX: 'image.sizeX',
				sizeY: 'image.sizeY',
				row: 'image.row',
				col: 'image.col'
			};

			$scope.space = spaceDetails;

			// Registering an callback for each image promise (push into appropriate images array)
			_.forEach(spaceDetails.spaceImagePromises, function (imPromise) {
				// After loading all image ids, load images one by one
				imPromise.then(function (res) {
					if (res.data.before == true) {
						$scope.beforeImages.push(res.data);
					} else {
						$scope.afterImages.push(res.data);
					}
				});
			});
		});

		$scope.openLightboxModal = function (array, index) {
			Lightbox.openModal(array, index);
		};

		// to prevent error from gridster item (this code normally would handle moving and resizing of tiles of the gridster).
		$scope.updateImage = function () { };

		// close before pane as a function to be used in many places
		$scope.closeBeforePane = function () {
			$('.before-pics').addClass('slideOutUp');

			// fade out background
			$('.all-screen-before-bg').animate({opacity: 0}, 500, 'linear', function() {$('.all-screen-before-bg').css({display: 'none'});});

		}
	});

//// this is a showcase of all pics a single space - THIS IS NOT A PREVIEW CONTROLLER
//spacesService.loadAllSpacesWithImages().then(function (res) {
//
//	// different parameters for main view a for separate space view (one's position and sizes for all spaces, the other for single)
//	$scope.customItemMap = {
//		sizeX: 'image.sizeX',
//		sizeY: 'image.sizeY',
//		row: 'image.row',
//		col: 'image.col'
//	};
//
//	//$scope.space = res;
//	$scope.space = _.find(res, { _id: $stateParams.id});
//
//	$scope.afterImages = _.filter($scope.space.images, { 'before': false });
//	$scope.beforeImages = _.filter($scope.space.images, { 'before': true });
//});


