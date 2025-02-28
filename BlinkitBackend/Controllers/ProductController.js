import { CategoryModel } from "../Models/Category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadResult } from "../utils/fileUpload.js";

export const AddProduct = async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      selectcateogary,
      selectsubcateogary,
      productunit,
      productstock,
      productprice,
      productdiscount,
      keyfeatures,
    } = req.body;
    if (
      !productname ||
      !productdescription ||
      !selectcateogary ||
      !selectsubcateogary ||
      !productunit ||
      !productstock ||
      !productprice ||
      !keyfeatures
    ) {
      throw new ApiError(400, "Please fill all the fields");
    }
    console.log("req.file", req.body);
    if (!req.files.productimage || !req.files.productsubimages) {
      throw new ApiError(400, "Please upload an image");
    }

    const fileurl = await uploadResult(req.files["productimage"][0].path);
    const productsubimages = await Promise.all(
      req.files["productsubimages"].map((image) => uploadResult(image.path))
    );

    const productsubimagesUrls = productsubimages.map((result) => result.url);
    console.log("fileurl", fileurl, productsubimagesUrls);
    const GetCatModel = await CategoryModel.findOne();
    const FindCat = GetCatModel.Categories.find(
      (cateogories) => cateogories._id.toString() === selectcateogary
    ).SubcatogaryArray.find(
      (subcat) => subcat._id.toString() === selectsubcateogary
    );
    if (!FindCat) {
      throw new ApiError(400, "Cateogory not exist");
    }
    const productoriginal =
      productdiscount > 0
        ? (productprice / (1 - productdiscount / 100)).toFixed(2)
        : productprice;

    console.log("productoriginal", productoriginal);
    FindCat.Products.push({
      productname,
      productdescription,
      selectcateogary: selectcateogary,
      selectsubcateogary: selectsubcateogary,
      productunit,
      productstock,
      productprice,
      productdiscount,
      keyfeatures,
      productimage: fileurl.url,
      productsubimage: productsubimagesUrls,
      productoriginalprice: productoriginal,
    });
    await GetCatModel.save();
    return res.json(
      new ApiResponse(200, GetCatModel, "Product created Succesfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
export const DeleteProduct = async (req, res) => {
  try {
    const { catgeoryid, subcatid, productid } = req.body;
    if (!catgeoryid || !subcatid || !productid) {
      throw new ApiError(400, "Delete is invalid");
    }
    const GetModel = await CategoryModel.findOne();

    const Subcatogory = GetModel.Categories.find(
      (cat) => cat._id.toString() === catgeoryid
    ).SubcatogaryArray.find((subcat) => subcat._id.toString() === subcatid);
    if (!Subcatogory) {
      throw new ApiError(400, "Subcatogory is not found");
    }
    Subcatogory.Products = Subcatogory.Products.filter(
      (products) => products._id.toString() !== productid
    );
    await GetModel.save();

    return res.json(new ApiResponse(200, GetModel, "Product deleted"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const EditProduct = async (req, res) => {
  try {
    const {
      productname,
      productdescription,
      selectcateogary,
      selectsubcateogary,
      productunit,
      productstock,
      productprice,
      productdiscount,
      productid,
      keyfeatures,
    } = req.body;

    console.log("productdiscount", productdiscount);
    const requiredFields = {
      productname,
      productdescription,
      selectcateogary,
      selectsubcateogary,
      productunit,
      productstock,
      productprice,
      productid,
      keyfeatures,
    };

    if (
      Object.values(requiredFields).some(
        (field) => field === "" || field === null || field === undefined
      )
    ) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const fileurl = req.files["productimage"]?.[0]
      ? await uploadResult(req.files["productimage"][0].path)
      : null;

    let productsubimagesUrls = [];

    if (
      req.files["productsubimages"] &&
      req.files["productsubimages"].length > 0
    ) {
      const productsubimages = await Promise.all(
        req.files["productsubimages"].map((image) => uploadResult(image.path))
      );

      productsubimagesUrls = productsubimages.map((result) => result.url);
    }

    const GetModel = await CategoryModel.findOne();
    const findProductAlignwithcatandsubcat = GetModel?.Categories?.find(
      (categories) => categories._id.toString() === selectcateogary
    )
      .SubcatogaryArray?.find(
        (subcat) => subcat._id.toString() === selectsubcateogary
      )
      ?.Products?.find((products) => products._id.toString() === productid);

    const productoriginal =
      productdiscount > 0
        ? (productprice / (1 - productdiscount / 100)).toFixed(2)
        : productprice;

    if (!findProductAlignwithcatandsubcat) {
      const productexist = GetModel.Categories.flatMap((catogories) =>
        catogories.SubcatogaryArray.flatMap((subcat) => subcat.Products)
      ).find((products) => products._id.toString() === productid);

      if (!productexist) {
        throw new ApiError(400, "Product not exist");
      }

      const Addproduct = GetModel.Categories.find(
        (cat) => cat._id.toString() === selectcateogary
      ).SubcatogaryArray.find(
        (subcat) => subcat._id.toString() === selectsubcateogary
      );

      Addproduct.Products.push({
        productname,
        productdescription,
        selectcateogary,
        selectsubcateogary,
        productunit,
        productstock,
        productprice,
        keyfeatures,
        productdiscount,
        productoriginalprice: productoriginal,
        productimage: fileurl ? fileurl.url : productexist?.productimage,
        productsubimage:
          productsubimagesUrls.length > 0
            ? productsubimagesUrls
            : productexist?.productsubimage,
      });
      GetModel.Categories.forEach((category) => {
        category.SubcatogaryArray.forEach((subcategory) => {
          subcategory.Products = subcategory.Products.filter(
            (product) => product._id.toString() !== productid
          );
        });
      });
    } else {
      Object.assign(findProductAlignwithcatandsubcat, {
        productname,
        productdescription,
        selectcateogary,
        selectsubcateogary,
        productunit,
        productstock,
        productprice,
        keyfeatures,
        productdiscount,
        productoriginalprice: productoriginal,
        productimage: fileurl
          ? fileurl.url
          : findProductAlignwithcatandsubcat?.productimage,
        productsubimage:
          productsubimagesUrls.length > 0
            ? productsubimagesUrls
            : findProductAlignwithcatandsubcat?.productsubimage,
      });
    }
    await GetModel.save();
    return res.json(new ApiResponse(200, GetModel, "Updated Product"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
