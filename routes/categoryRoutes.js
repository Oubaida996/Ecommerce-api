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

const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryValidators');

const subCategoriesRoute = require('./subCategoryRoutes');

/* In most REST based Express.js applications, nesting routers as middleware is commonplace. To keep the parent req.params, you need to add { mergeParams: true } in to the child router. */
router.use('/:categoryId/subcategories', subCategoriesRoute);

router.route('/').get(getCategories).post(createCategory);

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

// Explain the meaning of middleware : https://expressjs.com/en/guide/writing-middleware.html
// router.get('/', getCategories);
// router.post('/', createCategory);

module.exports = router;
