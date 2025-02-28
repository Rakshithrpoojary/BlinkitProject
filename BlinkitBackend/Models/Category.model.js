import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productdescription: {
    type: String,
    required: true,
  },
  productimage: {
    type: String,
    required: true,
  },
  selectcateogary: {
    type: String,
    required: true,
  },
  selectsubcateogary: {
    type: String,
    required: true,
  },
  productunit: {
    type: Number,
    required: true,
  },
  productstock: {
    type: Number,
    required: true,
  },
  productprice: {
    type: Number,
    required: true,
  },
  productdiscount: {
    type: Number,
    required: false,
  },
  productsubimage: {
    type: [String],
    required: true,
  },
  keyfeatures: {
    type: String,
    required: true,
  },
  productoriginalprice: {
    type: Number,
    required: false,
  },
});
const SubCateogary = new mongoose.Schema({
  subcatogaryname: {
    type: String,
    required: true,
  },
  subcateogaryimage: {
    type: String,
    required: false,
  },
  catogaryname: {
    type: String,
    required: true,
  },
  Products: {
    type: [ProductSchema],
    required: true,
  },
});
const CategorySchema = new mongoose.Schema({
  imageurl: {
    type: String,
    required: true,
  },
  categoryname: {
    type: String,
    required: true,
  },
  SubcatogaryArray: {
    type: [SubCateogary],
    required: true,
  },
});

const CategoryArraySchema = new mongoose.Schema({
  Categories: {
    type: [CategorySchema],
    required: true,
  },
});

export const CategoryModel = mongoose.model("Category", CategoryArraySchema);
