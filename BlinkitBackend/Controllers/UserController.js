import { Usermodel } from "../Models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51QuyGxJ7IL7uDEG5B5QXfybR2Q5tn5lk9bs4O8MCObCr4ssaxZAZvhUNu8THrDmooa13eT9JXzyUOkBi4B3jbNKz009cFU4Yqj"
);

export const GenerateAccessandRefreshToken = async (id) => {
  const user = await Usermodel.findById(id);
  const accessToken = user.AccessTokenGenerator();
  const refreshToken = user.RefreshTokenGenerator();
  console.log("accessToken", accessToken, refreshToken);
  user.refreshtoken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};
export const RegisterController = async (req, res) => {
  try {
    const { Name, Email, Password, confirmpassword } = req.body;
    console.log(Name);
    if (!Name || !Email || !Password || !confirmpassword) {
      throw new ApiError(400, "Please fill all the fields");
    }
    if (Password !== confirmpassword) {
      throw new ApiError(400, "Passwords do not match. Please try again");
    }
    const userExist = await Usermodel.findOne({ username: Name, email: Email });
    console.log("userExist", userExist);
    if (userExist) {
      throw new ApiError(400, "User Already Exist");
    }
    const created_user = await Usermodel.create({
      username: Name,
      email: Email,
      password: Password,
      role: Email.includes("blinkit.com") ? "admin" : "user",
    });
    const createdUser = await Usermodel.findById(created_user._id).select(
      "-password"
    );
    return res.json(
      new ApiResponse(200, createdUser, "User Added succesfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const LoginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const findUser = await Usermodel.findOne({ email: Email });
    if (!findUser) {
      throw new ApiError(402, "Invalid email or password");
    }
    const checkPassword = await findUser.isPasswordCheck(Password);
    if (!checkPassword) {
      throw new ApiError(402, "Invalid email or password");
    }
    const { accessToken, refreshToken } = await GenerateAccessandRefreshToken(
      findUser._id
    );
    const userDetailsToSend = await Usermodel.findById(findUser._id).select(
      "-password -refreshtoken"
    );
    const options = {
      // httpOnly: false,
      // secure: true,
      // sameSite: "None",
    };
    return res
      .cookie("AccessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, userDetailsToSend, "User logged in Succesfully")
      );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const LogoutController = async (req, res) => {
  console.log(req.user);
  try {
    await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshtoken: "",
        },
      },
      {
        new: true,
      }
    );
    const options = {
      // httpOnly: true,
      // secure: true,
      // sameSite: "None",
    };
    return res
      .clearCookie("AccessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, null, "User Loged Out"));
  } catch (error) {
    return res.json(new ApiResponse(400, null, error.message));
  }
};
export const UpdateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log("Name", username, email);
    if (
      Object.values(req.body).some(
        (field) => field === "" || field === null || field === undefined
      )
    ) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const FindandUpdate = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          username,
          email,
        },
      },
      {
        new: true,
      }
    ).select("-password -refreshtoken");
    return res.json(
      new ApiResponse(200, FindandUpdate, "User details Updated")
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const AddAddres = async (req, res) => {
  try {
    const { id, addressline, city, state, pincode, country, mobileno } =
      req.body;
    if (!addressline || !city || !state || !pincode || !country || !mobileno) {
      throw new ApiError(400, "Please fill all the fields");
    }
    const FindUser = await Usermodel.findById(req.user._id).select(
      "-password -refreshtoken"
    );
    if (!FindUser) {
      throw new ApiError(400, "User not found");
    }
    const AddressIndex = FindUser.Address.findIndex(
      (address) => address.id === id
    );
    const obj = {
      id,
      addressline,
      city,
      state,
      pincode,
      country,
      mobileno,
    };

    if (AddressIndex !== -1) {
      FindUser.Address[AddressIndex] = obj;
      await FindUser.save();
      return res.json(new ApiResponse(200, FindUser, "Updated Address"));
    }

    const findUserToUpdateAddress = await Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          Address: obj,
        },
      },
      { new: true }
    ).select("-password -refreshtoken");
    if (!findUserToUpdateAddress) {
      throw new ApiError(400, "User not found");
    }
    return res.json(
      new ApiResponse(200, findUserToUpdateAddress, "Address added sucesfully")
    );
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const DeleteAddress = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const findUser = await Usermodel.findById(req.user._id).select(
      "-password -refreshtoken"
    );
    if (!findUser) {
      throw new ApiError(400, "User not Found");
    }
    findUser.Address = findUser.Address.filter((user) => user.id !== id);
    await findUser.save();
    return res.json(new ApiResponse(200, findUser, "Deleted Address"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const AddtoCart = async (req, res) => {
  try {
    const product = req.body;
    if (!product?.productid) {
      throw new ApiError(400, "Out of Stock");
    }
    const findUser = await Usermodel.findById(req.user._id);
    const itemalreadyexist = findUser.Cartitems.find(
      (item) => item.productid === product?.productid
    );
    console.log("itemalreadyexist", itemalreadyexist);
    if (!itemalreadyexist) {
      findUser.Cartitems.push({ ...product, Quantity: 1 });
    } else {
      itemalreadyexist.Quantity += 1;
    }
    await findUser.save();
    return res.json(new ApiResponse(200, findUser, "Item Added to the cart"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
export const RemoveFromCart = async (req, res) => {
  try {
    const { productid } = req.body;
    if (!productid) {
      throw new ApiError(400, "Out of Stock");
    }
    const finduser = await Usermodel.findById(req.user._id);
    const findItem = finduser.Cartitems.find(
      (item) => item.productid === productid
    );
    if (!findItem) {
      throw new ApiError(400, "Item not exist");
    }
    if (findItem.Quantity === 1) {
      finduser.Cartitems = finduser.Cartitems.filter(
        (item) => item.productid !== productid
      );
    } else {
      findItem.Quantity -= 1;
    }
    await finduser.save();
    return res.json(new ApiResponse(200, finduser, "Item deleted from cart"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const Order = async (req, res) => {
  try {
    const findUser = await Usermodel.findById(req.user._id);
    findUser.Cartitems.map(({ productname, productimage, Quantity }) =>
      findUser.Orders.push({
        ordername: productname,
        orderimage: productimage,
        orderQuantity: Quantity,
      })
    );
    findUser.Cartitems = [];
    await findUser.save();
    return res.json(new ApiResponse(200, findUser, "Order Success"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};

export const PaymentOrder = async (req, res) => {
  try {
    const { products } = req.body;
    console.log("PRODUCTS", products);
    const lineitems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.productname,
        },
        unit_amount: product.productprice * 100,
      },
      quantity: product.Quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineitems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/success",
      metadata: {
        userId: req.user._id.toString(),
      },
    });

    return res.json(new ApiResponse(200, session.id, "Payment Success"));
  } catch (error) {
    return res.json(new ApiResponse(error.statuscode, null, error.message));
  }
};
