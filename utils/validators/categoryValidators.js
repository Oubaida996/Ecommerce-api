'use strict';

//check means any type {param ,body ,...}
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getCategoryValidator = [
  // 1- Rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  // 1- Rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  // 1- Rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
