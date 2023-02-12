'use strict';

const express = require('express');
const router = express.Router();
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
} = require('../services/subCategoryService');

router.route('/').post(createSubCategory).get(getSubCategories);

router.route('/:id').get(getSubCategory);

module.exports = router;
