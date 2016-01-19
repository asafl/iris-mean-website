'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpaceSchema = new Schema({
  name: String,
  about: String,
  credits: String,
  active: {type: Boolean, default: true},
  //pics: {type: mongoose.Schema.Types.ObjectId, ref: "SpacePic"}
  images: [{img: String,
            info: String,
            credits: String,
            main: {type: Boolean, default: false},
            sizeX: {type: Number, default: 3},
            sizeXMain: {type: Number, default: 3},
            sizeY: {type: Number, default: 2},
            sizeYMain: {type: Number, default: 2},
            col: {type: Number, default: 0},
            colMain: {type: Number, default: 0},
            row: {type: Number, default: 0},
            rowMain: {type: Number, default: 0}
            }]
});

module.exports = mongoose.model('Space', SpaceSchema);