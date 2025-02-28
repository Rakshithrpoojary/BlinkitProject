import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CategoryModel } from "../Models/Category.model.js";
import { uploadResult } from "../utils/fileUpload.js";

export const AddSubcatogary = async (req, res) => {
  try {
    const { subcatogaryname, catogaryname } = req.body;
    if (!req.file) {
      throw new ApiError(400, "Please upload the file");
    }
    const file = req.file.path;
    console.log(subcatogaryname, catogaryname, file);
    if (!subcatogaryname || !catogaryname || !file) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const fileurl = await uploadResult(file);
    const FindCatogary = await CategoryModel.findOne();
    const findCatogaryname = FindCatogary.Categories.find(
      (catogories) => catogories.categoryname === catogaryname
    );
    if (!findCatogaryname) {
      throw new ApiError(400, " Please fill all the fields");
    }
    findCatogaryname.SubcatogaryArray.push({
      subcatogaryname: subcatogaryname,
      catogaryname: catogaryname,
      subcateogaryimage: fileurl.url,
    });
    await FindCatogary.save();
    return res.json(new ApiResponse(200, FindCatogary, "Sub Catogary added"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
export const EditSubcategory = async (req, res) => {
  try {
    const { categaryid, subcategoryid, subcatogaryname, catogaryname } =
      req.body;
    console.log("PUT", req.body);
    if (!subcatogaryname || !catogaryname) {
      throw new ApiError(400, "Please fill all the fields");
    }
    let fileurl;
    if (req.file) {
      const file = req.file.path;
      fileurl = await uploadResult(file);
    }
    const SubcatModel = await CategoryModel.findOne();
    const findsubcategory = SubcatModel.Categories.find(
      (categories) => categories._id.toString() === categaryid
    ).SubcatogaryArray.find(
      (subcat) => subcat._id.toString() === subcategoryid
    );
    if (!findsubcategory) {
      throw new ApiError(400, "Subcategory not exist");
    }
    findsubcategory.subcatogaryname = subcatogaryname;
    findsubcategory.catogaryname = catogaryname;
    (findsubcategory.subcateogaryimage = fileurl
      ? fileurl.url
      : findsubcategory.subcateogaryimage),
      await SubcatModel.save();
    return res.json(new ApiResponse(200, SubcatModel, "Updated Subcategory"));
  } catch (error) {
    return res.json(new ApiResponse(400, null, error.message));
  }
};
export const DeleteSubCateogory = async (req, res) => {
  try {
    const { cateogoryid, subcatogoryid } = req.body;
    if (!cateogoryid || !subcatogoryid) {
      throw new ApiError(400, "Item not exist to delete");
    }
    const GetModel = await CategoryModel.findOne();
    const FindCategory = GetModel.Categories.find(
      (categories) => String(categories._id) === cateogoryid
    );
    if (!FindCategory) {
      throw new ApiError(400, "Category not exist");
    }
    FindCategory.SubcatogaryArray = FindCategory.SubcatogaryArray.filter(
      (subcatogorys) => String(subcatogorys._id) != subcatogoryid
    );
    await GetModel.save();
    return res.json(new ApiResponse(200, GetModel, "Sub category deleted"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
