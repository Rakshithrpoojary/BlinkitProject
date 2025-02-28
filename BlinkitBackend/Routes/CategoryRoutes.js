import { Router } from "express";
import {
  AddCategory,
  GetCategories,
  DeleteCategory,
} from "../Controllers/CategoriesController.js";
import { VerifyLogin } from "../Middleweres/VerifyLogin.js";
import { upload } from "../Middleweres/Multermiddlewere.js";
export const categoryRouter = Router();
categoryRouter.post(
  "/addcategory",
  VerifyLogin,
  upload.single("category"),
  AddCategory
);
categoryRouter.get("/getcategory", GetCategories);
categoryRouter.post("/deletecategory", VerifyLogin, DeleteCategory);
