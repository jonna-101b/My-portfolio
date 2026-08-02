import express from "express";
import loginUser from "../Controllers/auth";

const authRouter = express.Router();

// Login route
authRouter.post("login", loginUser);

export default authRouter;