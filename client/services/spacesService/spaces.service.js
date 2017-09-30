'use strict';

angular.module('irisBenadoArchitectsApp')
	.factory('spacesService', function ($http, Upload, $q) {
		var allSpaces = [];
		var spaces1Pic = [];

		//// load data upon service load
		//var loadSpacesPromise = $q.defer();
		//$http.get('/api/spaces').then(function (res) {
		//	console.log("loaded all spaces");
		//	allSpaces = res.data;
		//	loadSpacesPromise.resolve(allSpaces);
		//});
		//
		//var loadAllSpacesWithImages = function () {
		//	return loadSpacesPromise.promise;
		//};

		var loadAllSpacesPromise;
		var loadAllSpacesWithImages = function () {
			if (!loadAllSpacesPromise) {
				loadAllSpacesPromise = $q.defer();
				$http.get('/api/spaces').then(function (res) {
					console.log("loaded all spaces");
					allSpaces = res.data;
					loadAllSpacesPromise.resolve(allSpaces);
				});
			}

			return loadAllSpacesPromise.promise;
		};

		// "Showcase"
		var loadSpaces1PicPromise;
		function actuallyLoadsSpaces1Pic () {
			loadSpaces1PicPromise = null;
			loadSpaces1PicPromise = $q.defer();
			console.log("promise ready");
			$http.get('/api/spaces/1pic').then(function (res) {
				console.log("all spaces 1 pic");
				spaces1Pic = res.data;
				loadSpaces1PicPromise.resolve(spaces1Pic);
			});
		}

		actuallyLoadsSpaces1Pic();

		// Spaces - return promises
		var loadAllSpaces1Pic = function () {
			return loadSpaces1PicPromise.promise;
		};

		var loadSpacePromise = {};
		//// This will get the space from the all spaces, if all spaces were already preloaded.
		//var loadSpaceIfPreloaded = function (spaceId) {
		//	if (!loadSpacePromise[spaceId]) { // if an entry for this space wasn't created yet- create it and return promise
		//		loadSpacePromise[spaceId] = $q.defer();
		//
		//		loadAllSpacesPromise.promise.then(function (spaces) {
		//			var space = _.find(spaces, { _id: spaceId });
		//			loadSpacePromise[spaceId].resolve(space);
		//		});
		//	}
		//
		//	// return promise while waiting for other promise
		//	return loadSpacePromise[spaceId].promise;
		//};

		// Actually gets the spaces from the server, returns a promise that can be "thened".
		var loadSpace = function (spaceId) {
			if (!loadSpacePromise[spaceId]) { // if an entry for this space wasn't created yet- create it and return promise
				loadSpacePromise[spaceId] = $http.get('/api/spaces/' + spaceId);
			}

			return loadSpacePromise[spaceId];
		};

		var createSpace = function () {
			return $http.post('/api/spaces', {});
		};

		var updateSpace = function (updatedSpaceDetails) {
			return $http.put('/api/spaces/' + updatedSpaceDetails._id, {
				name: updatedSpaceDetails.name,
				about: updatedSpaceDetails.about,
				credits: updatedSpaceDetails.credits
			});
		};

		var deleteSpace = function (spaceId) {
			return $http.delete('/api/spaces/' + spaceId);
		};

		// Images
		var imagesForSpacePromise = {};
		var getAllImagesForSpace = function (spaceId) {
			if (!imagesForSpacePromise[spaceId]) { // if an entry for this space wasn't created yet- create it and return promise
				imagesForSpacePromise[spaceId] = $q.defer();

				loadAllSpacesPromise.promise.then(function (spaces) {
					var images = _.find(spaces, { '_id': spaceId }).images;
					imagesForSpacePromise[spaceId].resolve(images);
				});
			}

			// return promise while waiting for other promise
			return imagesForSpacePromise[spaceId].promise;
		};

		// Returns details of the space, with an array of promises, one for each pic
		var getAllImagesForSpaceOneByOne = function (spaceId) {
			// prepare promise
			var prom = $q.defer();

			// get all image id's and prepare array prepare array of promises for each image, resolve promise with array.
			$http.get('/api/spaces/' + spaceId + '/imageIDs').then(function (res) {
				var spaceImagesPromisesArray = [];

				_.forEach(res.data.imageIDs, function (imageId) {
					spaceImagesPromisesArray.push($http.get('/api/spaces/' + spaceId + '/im?imId=' + imageId))
				});

				var spaceDetails = res.data;
				spaceDetails["spaceImagePromises"] = spaceImagesPromisesArray;

				prom.resolve(spaceDetails);
			});

			return prom.promise;
		};

		var uploadImages = function (spaceId, imagesToUpload) {
			return Upload.upload({
				url: '/api/spaces/' + spaceId + '/im',
				data: {file: imagesToUpload}
			});
		};

		var updateImageDetails = function (spaceId, updatedImage) {
			return $http.put('/api/spaces/' + spaceId + '/im?imId=' + updatedImage._id, {
				info: updatedImage.info,
				credits: updatedImage.credits,
				main: updatedImage.main,
				before: updatedImage.before,
				sizeXMain: updatedImage.sizeXMain,
				sizeYMain: updatedImage.sizeYMain,
				rowMain: updatedImage.rowMain,
				colMain: updatedImage.colMain,
				sizeX: updatedImage.sizeX,
				sizeY: updatedImage.sizeY,
				row: updatedImage.row,
				col: updatedImage.col
			});
		};

		var deleteImage = function (spaceId, im) {
			return $http.delete('/api/spaces/' + spaceId + '/im?imId=' + im._id);
		};

		var deleteAllImagesForSpace = function (spaceId, im) {
			return $http.delete('/api/spaces/' + spaceId + '/im/allIm');
		};

		// Public API here
		return {
			loadAllSpacesWithImages: loadAllSpacesWithImages,
			loadAllSpaces1Pic: loadAllSpaces1Pic,
			actuallyLoadsSpaces1Pic: actuallyLoadsSpaces1Pic,
			loadSpace: loadSpace,
			createSpace: createSpace,
			updateSpace: updateSpace,
			deleteSpace: deleteSpace,
			getAllImagesForSpace: getAllImagesForSpace,
			getAllImagesForSpaceOneByOne: getAllImagesForSpaceOneByOne,
			updateImageDetails: updateImageDetails,
			uploadImages: uploadImages,
			deleteImage: deleteImage,
			deleteAllImagesForSpace: deleteAllImagesForSpace
		};
	});
