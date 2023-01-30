'use strict';

const CategoryModel = require('../models/categoryModel');

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

exports.createCategory = (req, res) => {
    const { name } = req.body;
    CategoryModel.create({ name })
        .then((category) => {
            res.status(201).json({ data: category });
        })
        .catch((err) => {
            res.status(400).json({ 'Error form createCategory method': err });
        });
};