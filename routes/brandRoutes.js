'use strict';

const express = require('express');

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../services/brandService');

const {
  createBrandValidator,
  updateBrandValidator,
  getSpecificBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidators');

const router = express.Router();

router.route('/').get(getBrands).post(createBrandValidator, createBrand);

router
  .route('/:id')
  .get(getSpecificBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;
