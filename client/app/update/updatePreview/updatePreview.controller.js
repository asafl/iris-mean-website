'use strict';

angular.module('irisBenadoArchitectsApp')
	.controller('SpacesCtrl', function ($scope, $stateParams, spacesService, $state) {

		$scope.items = [];
		$scope.state = $state.current.name;
		$scope.ifSpacesState = '.';

		// set updatability depending on if we're in preview mode or in prod mode (depending of the url)
		if ($scope.state === 'spaces') {
			// should be non-updateable
			$scope.gridsterOpts = {
				resizable: {
					enabled: false
				},
				draggable: {
					enabled: false
				}
			};
		} // else it is updateable by default


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

				$scope.items = res;

			});
		} else {
			// this is a preview of the main page
			spacesService.loadAllSpaces1Pic().then(function (res) {
				// different parameters for main view and for separate space view
				$scope.customItemMap = {
					sizeX: 'item.sizeXMain',
					sizeY: 'item.sizeYMain',
					row: 'item.rowMain',
					col: 'item.colMain'
				};

				res.forEach(function (space) {
					// add id and name to item
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
		// TODO: update only if item changed (hard because the change is directly inside the item, so there's nothing to compare to
		var imageUpdateItem;
		$scope.updateImage = function (imageToUpdate, imageId) {
			// check if this is a single space or main preview
			if ($stateParams.id) { // single space
				imageUpdateItem = {
					sizeX: imageToUpdate.sizeX,
					sizeY: imageToUpdate.sizeY,
					row: imageToUpdate.row,
					col: imageToUpdate.col,
					_id: imageId
				};

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

				spacesService.updateImageDetails(spaceId, imageUpdateItem);
			}
		};

	});




//// first check it data changeג
//var imageToCompare = _.find($scope.items, {'_id': imageId});
//
//if (imageToUpdate.sizeX !== imageToCompare.sizeX || imageToUpdate.sizeY !== imageToCompare.sizeY || imageToUpdate.row !== imageToCompare.row || imageToUpdate.col !== imageToCompare.col) {
//	// image change - update!
//	console.log("changed");
//}
