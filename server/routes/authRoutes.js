import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  getCurrentUser,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/currentuser", userAuth, getCurrentUser);

export default authRouter;
