'use strict';

//check means any type {param ,body ,...}
const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 chars')
    .notEmpty()
    .withMessage('The title of product is required'),

  check('description')
    .isLength({ min: 20 })
    .withMessage('Must be at least 20 chars')
    .isLength({ max: 2000 })
    .withMessage('Must be less than 2000 chars')
    .notEmpty()
    .withMessage('The description of product is required'),

  check('quantity')
    .notEmpty()
    .withMessage('The quantity of product is required')
    .isNumeric()
    .withMessage('The quantity of product must be a number'),

  check('sold')
    .optional()
    .isNumeric()
    .withMessage('The sold of product must be a number'),

  check('price')
    .notEmpty()
    .withMessage('The price of product is required')
    .isNumeric()
    .withMessage('The price of product must be a number')
    .isLength({ max: 32 })
    .withMessage('The price of product is too long'),

  check('priceAfterDiscount')
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage('The price after discount of product must be a number')
    .isLength({ max: 32 })
    .withMessage('The price after discount of product is too long')
    .custom((value, { req }) => {
      if (req.body.price >= value) {
        throw new Error(
          'The price after discount must be less than an actual price'
        );
      }
      return true;
    }),

  check('colors')
    .optional()
    .isArray()
    .withMessage('Colors of product must be an array of string'),

  check('imageCover')
    .notEmpty()
    .withMessage('The title of product is required'),

  check('images')
    .optional()
    .isArray()
    .withMessage('Images of product must be an array of string'),

  check('category')
    .isMongoId()
    .withMessage('The category of product is Invalid Id format')
    .notEmpty()
    .withMessage('The category of product is required'),

  check('subcategory')
    .optional()
    .isMongoId()
    .withMessage('The subcategory of product is Invalid Id format'),

  check('brand')
    .optional()
    .isMongoId()
    .withMessage('The brand of product is Invalid Id format'),

  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('The ratings average of product must be a number')
    .isLength({ max: 5 })
    .withMessage('The price of product is too long')
    .isLength({ min: 1 })
    .withMessage('The price of product is too short'),

  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('The ratings quantity of product must be a number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid Id format for product'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid Id format for product'),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid Id format for product'),
  validatorMiddleware,
];
