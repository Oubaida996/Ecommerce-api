'use strict';

const ProductModel = require('../models/productModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiErorr');

// @desc    Get a list of Products
// @route   GET /api/v1/products?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Public

exports.getProducts = asyncHandler(async (req, res) => {
  // (req.query.page * 1) means convert the string into integer number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await ProductModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: products.length,
    page,
    data: products,
  });
});

// @desc    Get a  Product
// @route   GET /api/v1/products/:id
// @params  id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.find({ _id: id });
  if (!product) return next(`The product isn't exist`, 404);
  res.status(200).json({ data: product });
});

// @desc    Create a new Product
// @route   Post /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const product = await ProductModel.create({
    ...req.body,
    slug: slugify(title),
  });
  res.status(201).json({ data: product });
});

// @desc    Update a Product
// @route   Put /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  const { id } = req.params;
  const product = await ProductModel.findOneAndUpdate(
    { _id: id },
    { ...req.body, slug: slugify(title) },
    {
      new: true,
    }
  );
  if (!product) return next(new ApiError(`The product isn't exist`, 404));
  res.status(200).json({ data: product });
});

// @desc    Delete a Product
// @route   Delete /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );
  if (!product) return next(new ApiError("The product isn't exist", 404));

  res.status(204).send();
});
