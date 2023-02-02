'use strict';

const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const categoryModel = require('../models/categoryModel');
const ApiError = require('../utils/ApiErorr');

// @desc    Get a list of categories
// @route   GET /api/v1/categories?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  // (req.query.page * 1) means convert the string into integer number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: categories.length,
    page,
    data: categories,
  });
});

// @desc    Get a specific category depend on ID
// @route   GET /api/v1/categories/:id
// @params  id : integer
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  
  if (!category) return next(new ApiError(`The catgegory isn't exist`, 404));
  res.status(200).json({ data: category });
});

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc    Update a specific category
// @route   PUT /api/v1/categories/:id
// @access  Private

exports.updateCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;
  // {filter},{fields that will update it},{option}
  // { new: true } this will return the row after update without it, it will return the row before update it
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  // if (!category) res.status(404).json({ message: `The catgegory isn't exist` });
  if (!category){
    return next(new ApiError(`The catgegory isn't exist`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Delete a specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const category = await categoryModel.findOneAndDelete(
    { _id: id },
    { new: true }
  );
  
  if (!category) return next(new ApiError(`The catgegory isn't exist`, 404));
  
  res.status(204).send();
});
