import jwt from "../utils/jwt.js";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else {
            token = req.cookies?.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        const decoded = jwt.verifyToken(token);
        req.user = decoded.user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error.message,
        });
    }
};

export default auth;