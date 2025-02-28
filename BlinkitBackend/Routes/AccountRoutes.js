import { Router } from "express";
export const accountrouter = Router();
import { VerifyLogin } from "../Middleweres/VerifyLogin.js";
import { GetUserDetails } from "../Controllers/AccountController.js";
import { AddAddres, DeleteAddress } from "../Controllers/UserController.js";
accountrouter.get("/profile", VerifyLogin, GetUserDetails);
accountrouter.post("/addadress", VerifyLogin, AddAddres);
accountrouter.post("/deleteaddress", VerifyLogin, DeleteAddress);
