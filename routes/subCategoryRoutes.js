'use strict';

const express = require('express');
const router = express.Router();
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require('../services/subCategoryService');

router.route('/').post(createSubCategory).get(getSubCategories);

router
  .route('/:id')
  .get(getSubCategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
