'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('SpacesCtrl', function ($scope, $stateParams, spacesService, $state, $timeout) {
		// USED FOR: ALL SPACES, ALL SPACES PREVIEW, SINGLE SPACE PREVIEW (STRANGE)

		$scope.items = [];
		$scope.state = $state.current.name;
		$scope.ifSpacesState = '.';

		$scope.gridsterOpts = {
			//defaultSizeY: 1,
			columns: 18,
			margins: [10,10]
		};

		// set updatability depending on if we're in preview mode or in prod mode (depending of the url)
		if ($scope.state === 'spaces') {
			// should be non-updateable
			$scope.gridsterOpts["resizable"] = {
					enabled: false
				};
			$scope.gridsterOpts["draggable"] = {
					enabled: false
				}
		} // else it is updateable by default

		// load all pics per space if there's an id
		if ($stateParams.id) {
			// this is a preview of a single space
			spacesService.getAllImagesForSpace($stateParams.id).then(function (res) {
				// different parameters for main view and for separate space view
				$scope.customItemMap = {
					sizeX: 'item.sizeX',
					sizeY: 'item.sizeY',
					row: 'item.row',
					col: 'item.col'
				};

				//$scope.items = res;
				$scope.items = _.filter(res, { 'before': false });

			});
		} else { // load only master pics per space
			// this is a preview of the all spaces page
			spacesService.loadAllSpaces1Pic().then(function (res) {
				// different parameters for main view and for separate space view
				$scope.customItemMap = {
					sizeX: 'item.sizeXMain',
					sizeY: 'item.sizeYMain',
					row: 'item.rowMain',
					col: 'item.colMain'
				};

				res.forEach(function (space) {
					// add the SPACE id and name to each separate images object
					space.images[0].spaceId = space._id; // ['spaceId']
					space.images[0].spaceName = space.name; // ['spaceName']
					$scope.items.push(space.images[0]);

					// if it's the spaces state: assign link
					if ($scope.state === 'spaces') { // only if in spaces state (and not in preview mode)
						$scope.ifSpacesState = 'single_space({id: item.spaceId })';
					}
				});
			});
		}

		// update image upon moving / resizing it... IT WAS HORRIBLE TO BUILD! moving through the gridster-item directive.
		var imageUpdateItem;
		var to;
		$scope.updateImage = function (imageToUpdate, imageId) {
			//if (to) $timeout.cancel(to);
			//
			//to = $timeout (function () { // USING TIME OUT CAUSES THE WRONG UPDATE TO BE SENT. HOW DO WE ONLY SEND THE LAST ONE?
				// check if this is a single space or main preview
				if ($stateParams.id) { // single space
					imageUpdateItem = {
						sizeX: imageToUpdate.sizeX,
						sizeY: imageToUpdate.sizeY,
						row: imageToUpdate.row,
						col: imageToUpdate.col,
						_id: imageId
					};

					//console.log("single space page:",imageUpdateItem);

					spacesService.updateImageDetails($stateParams.id, imageUpdateItem);

				} else { // main spaces view
					imageUpdateItem = {
						sizeXMain: imageToUpdate.sizeX,
						sizeYMain: imageToUpdate.sizeY,
						rowMain: imageToUpdate.row,
						colMain: imageToUpdate.col,
						_id: imageId
					};

					var spaceId = _.find($scope.items, { '_id': imageId}).spaceId;

					//console.log("all spaces page:",imageUpdateItem);

					spacesService.updateImageDetails(spaceId, imageUpdateItem);
				}
			//}, 1000);

		};

	});




//// first check it data changeג
//var imageToCompare = _.find($scope.items, {'_id': imageId});
//
//if (imageToUpdate.sizeX !== imageToCompare.sizeX || imageToUpdate.sizeY !== imageToCompare.sizeY || imageToUpdate.row !== imageToCompare.row || imageToUpdate.col !== imageToCompare.col) {
//	// image change - update!
//	console.log("changed");
//}
//var identicalImages = function (newImage, imageToCompare, single) {
//	// first comparing gridster values:
//	if (single) { // compare as main images - this image was updated from an "all spaces" state
//		console.log('single');
//		if (newImage.sizeX !== imageToCompare.sizeX ||
//			newImage.sizeY !== imageToCompare.sizeY ||
//			newImage.row !== imageToCompare.row ||
//			newImage.col !== imageToCompare.col) {
//			return false;
//		}
//	} else { // compare as regular images
//		console.log('all');
//		if (newImage.sizeX !== imageToCompare.sizeXMain ||
//			newImage.sizeY !== imageToCompare.sizeYMain ||
//			newImage.row !== imageToCompare.rowMain ||
//			newImage.col !== imageToCompare.colMain) {
//			return false;
//		}
//	}
//
//	return true;
//};
//
//
