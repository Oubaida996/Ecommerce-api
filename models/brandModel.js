'use strict';

const mongoose = require('mongoose');

//1- Create Shema
const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: [true, 'Brand must be unique'],
      maxLength: [32, 'Too long brand name'],
      minLength: [3, 'Too short brand name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

//2- export Model
module.exports = mongoose.model('Brand', brandSchema);
