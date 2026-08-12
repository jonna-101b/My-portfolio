import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { APIError } from "../Errors/APIError.js";

export const generateToken = (payload, secretKey, duration) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: duration });
    return token
};

export const hashPassword = async (password, salt) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};

export const verifyToken = (token, secretKey) => {
    try {
        const verify = jwt.verify(token, secretKey);
        return verify;
    }
    catch (error) {
        throw APIError.unauthorized("Invalid or expired access token");
    }
};