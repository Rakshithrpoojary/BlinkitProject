import { Usermodel } from "../Models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GenerateAccessandRefreshToken } from "../Controllers/UserController.js";
import jwt from "jsonwebtoken";

export const VerifyLogin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(404, "Please Login to continue");
    }
    const decodeToken = jwt.decode(token);
    if (!decodeToken?._id) {
      throw new ApiError(404, "Unauthorised Request");
    }
    let verifyjwt;
    try {
      verifyjwt = jwt.verify(token, process.env.ACCESS_TOKEN_SECREAT);
    } catch (error) {
      if (error.message === "jwt expired") {
        const findRefreshToken = await Usermodel.findOne({
          _id: decodeToken._id,
          refreshtoken: { $exists: true },
        });
        if (!findRefreshToken || !findRefreshToken.refreshtoken) {
          throw new ApiError(403, "Please Login Again");
        }
        const { accessToken, refreshToken } =
          await GenerateAccessandRefreshToken(findRefreshToken._id);
        findRefreshToken.refreshtoken = refreshToken;
        await findRefreshToken.save();
        res.cookie("AccessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
      } else {
        throw new ApiError(400, "Invalid user");
      }
    }
    const user = await Usermodel.findById(decodeToken._id).select(
      "-password -refreshtoken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
