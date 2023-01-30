'use strict';

const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const categoryModel = require('../models/categoryModel');

// @desc    Get a list of categories
// @route   Post /api/v1/categories
// @access    Public
exports.getCategories = asyncHandler(async(req, res) => {
    const categories = await categoryModel.find({});
    res.status(200).json({
        results: categories.length,
        data: categories,
    });
});

// @desc    Create a category
// @route   Post /api/v1/categories
// @access    Private
exports.createCategory = asyncHandler(async(req, res) => {
    const { name } = req.body;
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});