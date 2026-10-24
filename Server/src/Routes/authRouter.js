import express from "express";
import { getAdmin, loginAdmin, logoutAdmin, refreshTokenHandler } from "../Controllers/auth.js";
import { loginValidator } from '../Validator/authValidator.js';
import { authLimiter } from '../Middleware/rateLimiters.js';

const authRouter = express.Router();

// Login route with brute-force rate limiter
authRouter.post("/login", authLimiter, loginValidator, loginAdmin);
authRouter.post("/refresh", refreshTokenHandler);
authRouter.post("/logout", logoutAdmin);
authRouter.get("/admin", getAdmin);

export default authRouter;
