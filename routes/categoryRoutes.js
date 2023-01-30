'use strict';

const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
} = require('../services/categoryService');

// router.get('/', getCategories);
// router.post('/', createCategory);

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory);

module.exports = router;
