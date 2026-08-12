import express from "express";
import { getAdmin, loginAdmin, logoutAdmin, refreshTokenHandler } from "../Controllers/auth.js";
import { loginValidator } from '../Validator/authValidator.js';

const authRouter = express.Router();

// Login route
authRouter.post("/login", loginValidator, loginAdmin);
authRouter.post("/refresh", refreshTokenHandler);
authRouter.post("/logout", logoutAdmin);
authRouter.get("/profile", getAdmin);

export default authRouter;
