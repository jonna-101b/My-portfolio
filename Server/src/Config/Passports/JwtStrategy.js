import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../environments.js";
import AdminModel from "../../Models/admin.js";

const cookieExtractor = (req) => {
    if ( req && req.cookies ) {
        return req.cookies["accessToken"] || null;
    }

    return null;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwtAccessSecret
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
    try {
        const admin = await AdminModel.findById(payload._id);

        if (admin) {
            return done(null, admin);
        }

        return done(null, false);
    }
    catch (error) {
        done(error, false);
    }
});