'use strict';

const express = require('express');
const router = express.Router();
const {
  createSubCategory,
  getSubCategory,
} = require('../services/subCategoryService');

router.route('/').post(createSubCategory);

router.route('/:id').get(getSubCategory);

module.exports = router;
