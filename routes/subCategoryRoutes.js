'use strict';

const express = require('express');
const router = express.Router();
const { createSubCategory } = require('../services/subCategoryService');

router.route('/').post(createSubCategory);


module.exports =router;