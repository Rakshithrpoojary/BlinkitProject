import { Usermodel } from "../Models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CategoryModel } from "../Models/Category.model.js";
export const GetUserDetails = async (req, res) => {
  try {
    if (!req.user) {
      throw new ApiError(400, "User does not exist");
    }
    const finduser = await Usermodel.findById(req.user._id);
    const getProductModel = await CategoryModel.findOne();
    const getAllproducts = getProductModel.Categories.flatMap((cat) =>
      cat.SubcatogaryArray.flatMap((subcat) => subcat.Products)
    );
    const finalcartitems = finduser.Cartitems.filter((cart) =>
      getAllproducts.some(
        (products) => products._id.toString() === cart.productid
      )
    );
    finduser.Cartitems = finalcartitems;
    await finduser.save();
    return res.json(
      new ApiResponse(200, req.user, "User information fetched succesfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
