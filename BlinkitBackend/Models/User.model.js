import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
const AddressSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  addressline: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
});
const CartProduct = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  productprice: {
    type: Number,
    required: true,
  },
  productimage: {
    type: String,
    required: true,
  },
  productunit: {
    type: Number,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: false,
  },
});
const Order = new mongoose.Schema({
  orderid: {
    type: String,
    default: `ORD-${uuid().substring(0, 12)}`,
  },
  orderimage: {
    type: String,
    required: true,
  },
  ordername: {
    type: String,
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: false,
  },
});
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    refreshtoken: {
      type: String,
    },
    role: {
      type: String,
    },
    Address: {
      type: [AddressSchema],
      required: true,
    },
    Cartitems: {
      type: [CartProduct],
      required: true,
    },
    Orders: {
      type: [Order],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
User.methods.isPasswordCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};
User.methods.AccessTokenGenerator = function () {
  return jwt.sign(
    { _id: this._id, name: this.username, email: this.email },
    process.env.ACCESS_TOKEN_SECREAT,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};
User.methods.RefreshTokenGenerator = function () {
  return jwt.sign(
    { _id: this._id, name: this.username, email: this.email },
    process.env.REFRESH_TOKEN_SECREAT,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};
export const Usermodel = mongoose.model("Usermodel", User);
