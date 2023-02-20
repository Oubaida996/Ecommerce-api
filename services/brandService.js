'use strict';

const BrandModel = require('../models/brandModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiErorr');

// @desc    Get a list of Brands
// @route   GET /api/v1/brands?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  // (req.query.page * 1) means convert the string into integer number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: brands.length,
    page,
    data: brands,
  });
});

// @desc    Get a  Brand
// @route   GET /api/v1/brands/:id
// @params  id
// @access  Public
exports.getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const brand = await BrandModel.find({ _id: id });
  if (!brand) return next(`The brand isn't exist`, 404);
  res.status(200).json({ data: brand });
});

// @desc    Create a new Brand
// @route   Post /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc    Update a Brand
// @route   Put /api/v1/brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    {
      new: true,
    }
  );
  if (!brand) return next(new ApiError(`The brand isn't exist`, 404));
  res.status(200).json({ data: brand });
});

// @desc    Delete a Brand
// @route   Delete /api/v1/brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );
  if (!brand) return next(new ApiError("The brand isn't exist", 404));

  res.status(204).send();
});
