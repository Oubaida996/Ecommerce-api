'use strict';

const express = require('express');
const router = express.Router();
const { param, validationResult } = require('express-validator');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');

// Explain the meaning of middleware : https://expressjs.com/en/guide/writing-middleware.html
// router.get('/', getCategories);
// router.post('/', createCategory);

router.route('/').get(getCategories).post(createCategory);

router
  .route('/:id')
  .get(
    // 1- rules
    param('id').isMongoId().withMessage('Invalid category id'),
    // 2- middleware => catch errors form rules if exist
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    },
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
