'use strict';

const SubCategoryModel = require('../models/subCategoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const categoryModel = require('../models/categoryModel');
const ApiError = require('../utils/ApiErorr');

// @desc    Create subCategory
// @route   POST /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { category, name } = req.body;

  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category: category,
  });
  res.status(201).json({ data: subCategory });
});


