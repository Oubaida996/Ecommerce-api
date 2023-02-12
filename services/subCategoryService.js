'use strict';

const SubCategoryModel = require('../models/subCategoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiErorr');

// @desc    Create subCategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { categoryID, name } = req.body;

  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category: categoryID,
  });
  res.status(201).json({ data: subCategory });
});

// @desc    Get a specific subCategory depend on ID
// @route   GET /api/v1/subcategories/:id
// @params  id : integer
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id);

  if (!subCategory)
    return next(new ApiError(`The subcatgegory isn't exist`, 404));
  res.status(200).json({ data: subCategory });
});
