import { Router } from "express";
import { upload } from "../Middleweres/Multermiddlewere.js";
import { VerifyLogin } from "../Middleweres/VerifyLogin.js";
import {
  AddProduct,
  DeleteProduct,
  EditProduct,
} from "../Controllers/ProductController.js";
export const productRouter = Router();

productRouter.post(
  "/addproduct",
  VerifyLogin,
  upload.fields([
    { name: "productimage", maxCount: 1 },
    { name: "productsubimages" },
  ]),
  AddProduct
);
productRouter.post("/deleteproduct", VerifyLogin, DeleteProduct);
productRouter.put(
  "/editproduct",
  VerifyLogin,
  upload.fields([
    { name: "productimage", maxCount: 1 },
    { name: "productsubimages" },
  ]),
  EditProduct
);
