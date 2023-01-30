'use strict';

const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

// router.get('/', getCategories);
// router.post('/', createCategory);

router.route('/').get(getCategories).post(createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
