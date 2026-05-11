import { decode } from "jsonwebtoken";
import jwt from "../utils/jwt.js";
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }
        const decoded = jwt.verifyToken(token);
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(500).json({
            message: "Auth failed",
            error: error.message
        });
    }
};

export default auth