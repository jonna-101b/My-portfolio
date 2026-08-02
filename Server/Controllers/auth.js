import jwt from "jsonwebtoken";
import User from "../Models/user";

    
async function loginUser(req, res) {
    console.log("loginUser called: ", req.body);
    const SECRET_KEY = process.env.JWT_SECRET;
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '1h'
        });

        res.status(200).json({username: user.username, token});
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export default loginUser;