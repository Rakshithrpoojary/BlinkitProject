import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CategoryModel } from "../Models/Category.model.js";
import { uploadResult } from "../utils/fileUpload.js";
export const AddCategory = async (req, res) => {
  try {
    const file = req.file.path;
    const { categoryname } = req.body;
    console.log("categoryname", categoryname);
    if (!file) {
      throw new ApiError(400, "Please Upload the file");
    }
    const fileurl = await uploadResult(file);
    console.log("fileurl", fileurl);
    if (!fileurl) {
      throw new ApiError(400, "Upload failed");
    }
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      {},
      {
        $push: {
          Categories: { imageurl: fileurl.url, categoryname: categoryname },
        },
      },
      { new: true, upsert: true }
    );

    return res.json(new ApiResponse(200, updatedCategory, "Category created"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const GetCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.findOne();
    return res.json(
      new ApiResponse(
        200,
        categories.Categories,
        "Categories fetched successfully"
      )
    );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
};
export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new ApiError(400, "Item not exist");
    }
    const findcategory = await CategoryModel.findOne();
    if (!findcategory) {
      throw new ApiError(400, "Categories are empty");
    }
    findcategory.Categories = findcategory.Categories.filter(
      (category) => category._id != id
    );
    await findcategory.save();
    return res.json(new ApiResponse(200, findcategory, "Category deleted"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
