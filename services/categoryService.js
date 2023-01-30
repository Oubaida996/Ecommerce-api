'use strict';

const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const categoryModel = require('../models/categoryModel');

// @desc    Get a list of categories
// @route   Get /api/v1/categories?page=<number>&limit=<number>
// @access  Public
exports.getCategories = asyncHandler(async(req, res) => {
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

// @desc    Create a category
// @route   Post /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async(req, res) => {
    const { name } = req.body;
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});