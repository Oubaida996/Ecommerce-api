const mongoose = require('mongoose');

//=== 1- Create Schema

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: [true, 'Category must be unique'],
      maxLength: [32, 'Too long category name'],
      minLength: [3, 'Too short category name'],
    },

    // A and B => shopping.com/a-and-b Ex: Healthy food =>shopping.com/healthy-and-food
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

//==== 2- Create model
const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel;
