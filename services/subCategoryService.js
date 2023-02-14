'use strict';

const SubCategoryModel = require('../models/subCategoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiErorr');

// Nested Route
// @route   GET /api/v1/categories/:categoryId/subcategories
// https://www.damiannicholson.com/til/express-merge-params/

exports.createFilterObject = (req, res, next) => {
  const filterObj = req.params.categoryId
    ? { category: req.params.categoryId }
    : {};
  req.filterObj = filterObj;
  next();
};

// @desc    Get a list of subcategories
// @route   GET /api/v1/subcategories?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;

  const subcategories = await SubCategoryModel.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    results: subcategories.length,
    page,
    data: subcategories,
  });
});

// @desc    Get a specific subCategory depend on ID
// @route   GET /api/v1/subcategories/:id
// @params  id : integer
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findById(id).populate({
    path: 'category',
    select: 'name slug -_id',
  });
  /*  
  // Note : when you make populate, so you make to queries on db, so becareful when work with huge data.
  // -_id means without _id filed.
   */
  if (!subCategory)
    return next(new ApiError(`The subcatgegory isn't exist`, 404));
  res.status(200).json({ data: subCategory });
});

// Nested route
exports.setCategoryIdToBody = (req, res, next) => {
  req.body.categoryID = req.params.categoryId || req.body.categoryID;
  next();
};

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

// @desc    Update subCategory
// @route   PUT /api/v1/subcategories
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, categoryID } = req.body;

  const subCategory = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category: categoryID },
    { new: true }
  );

  if (!subCategory)
    return next(new ApiError(`The subcatgegory isn't exist`, 404));
  res.status(200).json({ data: subCategory });
});

// @desc    Delete subCategory
// @route   DELETE /api/v1/subcategories
// @access  Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const subCategory = await SubCategoryModel.findOneAndDelete(
    { _id: id },
    { new: true }
  );

  if (!subCategory)
    return next(new ApiError(`The subcatgegory isn't exist`, 404));
  res.status(204).send();
});
