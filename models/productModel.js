const mongoose = require('mongoose');

//=== 1- Create Schema

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [32, 'Product Title Is Too Long'],
      minLength: [3, 'Product Title Is Too Short'],
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, 'Product Description Is required'],
      minLength: [20, 'Product Description Is Too Short'],
    },

    quantity: {
      type: Number,
      required: [true, 'Product Quantity Is required'],
    },

    sold: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'Product Price Is required'],
      trim: true,
      max: [20, 'Product Price Is Too Long'],
    },

    priceAfterDiscount: {
      type: Number,
    },

    colors: [String],

    imageCover: {
      type: String,
      required: [true, 'Product ImageCover Is required'],
    },

    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product Needs to Belong to a Category'],
    },

    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
      },
    ],

    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand',
    },

    ratingsAverage: {
      type: Number,
      min: [1, 'Rating Must Be Above Or Equal 1.0'],
      max: [5, 'Rating Must Be Below Or Equal 5.0'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
