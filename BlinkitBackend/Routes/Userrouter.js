import { Router } from "express";
import {
  RegisterController,
  LoginController,
  LogoutController,
  UpdateUser,
  AddtoCart,
  RemoveFromCart,
  Order,
  PaymentOrder,
} from "../Controllers/UserController.js";
import { VerifyLogin } from "../Middleweres/VerifyLogin.js";

export const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/logout", VerifyLogin, LogoutController);
router.put("/edituser", VerifyLogin, UpdateUser);
router.post("/addtocart", VerifyLogin, AddtoCart);
router.post("/removefromcart", VerifyLogin, RemoveFromCart);
router.post("/order", VerifyLogin, Order);
router.post("/payment", VerifyLogin, PaymentOrder);
