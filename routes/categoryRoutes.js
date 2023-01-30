'use strict';

const express = require('express');
const router = express.Router();

const {
    getCategories,
    createCategory,
    getCategory,
} = require('../services/categoryService');

// router.get('/', getCategories);
// router.post('/', createCategory);

router.route('/').get(getCategories).post(createCategory);
router.get('/:id', getCategory);

module.exports = router;