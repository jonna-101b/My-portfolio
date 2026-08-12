import passport from "passport";
import { APIError } from "../Errors/APIError.js";

const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, admin) => {
        if (error) {
            return next(error)
        }

        if (!admin) {
            return next(APIError.unauthorized("Unauthorized access. Invalid or missing token.", ""))
        }

        req.admin = admin;
        next()
    })(req, res, next);
};

export default authenticate;