import AdminModel from "../Models/admin.js";
import { generateToken, verifyToken } from "../Utils/auth.js";
import { config } from "../Config/environments.js";
import RefreshTokenModel from "../Models/refreshToken.js";


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'strict',
};

export const loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminModel.login(email, password);
        const accessToken = generateToken({ _id: admin._id, email: admin.email }, config.jwtAccessSecret, "15m");
        const refreshToken = generateToken({ _id: admin._id, email: admin.email }, config.jwtRefreshSecret, "10d");
        await RefreshTokenModel.create({ token: refreshToken, admin: admin._id, expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) });

        res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        res.cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 10 * 24 * 60 * 60 * 1000 });
        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
};


export const refreshTokenHandler = async (req, res, next) => {
    try {
        const token = req.cookies["refreshToken"];

        if (!token) {
            return next(APIError.unauthorized('Refresh token missing'));
        }

        const refreshTokenDoc = await RefreshTokenModel.findOne({ token }).populate('admin');

        if (!refreshTokenDoc || refreshTokenDoc.expiresAt < new Date()) {
            return next(APIError.unauthorized('Invalid or expired refresh token'));
        }

        const admin = refreshTokenDoc.admin;

        if (!admin) {
            return next(APIError.unauthorized('Admin not found for refresh token'));
        }

        const newAccessToken = generateToken({ _id: admin._id, email: admin.email }, config.jwtAccessSecret, "15m");

        res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        return res.status(200).json({ success: true, message: 'Access token refreshed successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const logoutAdmin = async (req, res, next) => {
    try {
        const refreshToken = req.cookies["refreshToken"];

        if (refreshToken) {
            await RefreshTokenModel.deleteOne({ token: refreshToken });
        }

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    }
    catch (error) {
        next(error);
    }
};

export const getAdmin = async (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies["refreshToken"];
        const accessTokenCookie = req.cookies["accessToken"];

        const refreshToken = await RefreshTokenModel.findOne({ token: refreshTokenCookie });
        if (!refreshToken || refreshToken.expiresAt < new Date()) {
            return next(APIError.unauthorized('Invalid or expired refresh token'));
        }

        const { _id } = verifyToken(accessTokenCookie, config.jwtAccessSecret);
        const admin = await AdminModel.findOne({ _id });

        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
};