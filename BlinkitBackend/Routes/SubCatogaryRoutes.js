import { Router } from "express";
import { VerifyLogin } from "../Middleweres/VerifyLogin.js";
import { upload } from "../Middleweres/Multermiddlewere.js";
import {
  AddSubcatogary,
  DeleteSubCateogory,
  EditSubcategory,
} from "../Controllers/SubCatogaryController.js";
export const subcatogaryrouter = Router();
subcatogaryrouter.post(
  "/addsubcatogary",
  VerifyLogin,
  upload.single("subcateogaryimage"),
  AddSubcatogary
);
subcatogaryrouter.post("/deletesubcatogary", VerifyLogin, DeleteSubCateogory);

subcatogaryrouter.post(
  "/editsubcatogary",
  VerifyLogin,
  upload.single("subcateogaryimage"),
  EditSubcategory
);
