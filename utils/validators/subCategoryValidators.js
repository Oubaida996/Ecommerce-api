'use strict';

//check means any type {param ,body ,...}
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getSubCategoryValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  //1-Rules
  check('name')
    .notEmpty()
    .withMessage('Subcategory name is required')
    .isLength({ max: 32 })
    .withMessage('Too long subcategory name')
    .isLength({ min: 2 })
    .withMessage('Too short subcategory name'),
  check('categoryID')
    .notEmpty()
    .withMessage('Subcategory should belong into category')
    .isMongoId()
    .withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  // 1- Rules
  check('id').isMongoId().withMessage('Invalid subcategory id format'),
  check('name')
    .notEmpty()
    .withMessage('Subcategory name is required')
    .isLength({ max: 32 })
    .withMessage('Too long subcategory name')
    .isLength({ min: 2 })
    .withMessage('Too short subcategory name'),
  check('categoryID')
    .notEmpty()
    .withMessage('You should select the main category')
    .isMongoId()
    .withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  // 1- Rules
  check('id').isMongoId().withMessage('Invalid category id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
