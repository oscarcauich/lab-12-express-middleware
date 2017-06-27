'use strict';

const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  dateAdded: {type: Date, default: Date.now},
});

const Restaurant = module.exports = mongoose.model('restaurant', restaurantSchema);
