'use strict';

angular.module('irisBenadoArchitectsApp')
	.factory('spacesService', function ($http, Upload, $q) {
		var allSpaces = [];
		var spaces1Pic = [];

		// load data upon service load
		var loadSpacesPromise = $q.defer();
		$http.get('/api/spaces').then(function (res) {
			console.log("loaded all spaces");
			allSpaces = res.data;
			loadSpacesPromise.resolve(allSpaces);
		});

		// "Showcase"
		var loadSpaces1PicPromise = $q.defer();
		$http.get('/api/spaces/1pic').then(function (res) {
			console.log("all spaces 1 pic");
			spaces1Pic = res.data;
			loadSpaces1PicPromise.resolve(spaces1Pic);
		});

		// Spaces - return promises
		var loadAllSpacesWithImages = function () {
			return loadSpacesPromise.promise;
		};

		var loadAllSpaces1Pic = function () {
			return loadSpaces1PicPromise.promise;
		};

		var loadSpacePromise = {};
		var loadSpace = function (spaceId) {
			if (!loadSpacePromise[spaceId]) { // if an entry for this space wasn't created yet- create it and return promise
				loadSpacePromise[spaceId] = $q.defer();

				loadSpacesPromise.promise.then(function (spaces) {
					var space = _.find(spaces, { _id: spaceId });
					loadSpacePromise[spaceId].resolve(space);
				});
			}

			// return promise while waiting for other promise
			return loadSpacePromise[spaceId].promise;
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

				loadSpacesPromise.promise.then(function (spaces) {
					var images = _.find(spaces, { '_id': spaceId }).images;
					imagesForSpacePromise[spaceId].resolve(images);
				});
			}

			// return promise while waiting for other promise
			return imagesForSpacePromise[spaceId].promise;
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
			loadSpace: loadSpace,
			createSpace: createSpace,
			updateSpace: updateSpace,
			deleteSpace: deleteSpace,
			getAllImagesForSpace: getAllImagesForSpace,
			updateImageDetails: updateImageDetails,
			uploadImages: uploadImages,
			deleteImage: deleteImage,
			deleteAllImagesForSpace: deleteAllImagesForSpace
		};
	});
