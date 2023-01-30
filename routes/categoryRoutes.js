'use strict';

const express = require('express');
const router = express.Router();

const {
    getCategories,
    createCategory,
} = require('../services/categoryService');

// router.get('/', getCategories);
// router.post('/', createCategory);

router.route('/').get(getCategories).post(createCategory);

module.exports = router;