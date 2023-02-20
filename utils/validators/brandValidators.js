'use strict';

//check means any type {param ,body ,...}
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.getSpecificBrandValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid brand id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
exports.createBrandValidator = [
  //1-Rules
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ max: 32 })
    .withMessage('Too long brand name')
    .isLength({ min: 2 })
    .withMessage('Too short brand name'),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateBrandValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid brand id format'),
  check('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ max: 32 })
    .withMessage('Too long brand name')
    .isLength({ min: 2 })
    .withMessage('Too short brand name'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid brand id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
