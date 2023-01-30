'use strict';

const CategoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

exports.getCategories = (req, res) => {
    const { name } = req.body;
    console.log(req.body);

    const newCategory = new CategoryModel({ name });

    newCategory
        .save()
        .then((doc) => {
            res.json(doc);
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.createCategory = asyncHandler(async(req, res) => {
    const { name } = req.body;
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});