import config from '../config/config.js';
import jwt from 'jsonwebtoken';

const createToken = (data) => {
    try {
        const token = jwt.sign(data, config.JWT_SECRET, {
            expiresIn: "1d"
        });

        if (!token) {
            throw new Error("Token not created");
        }

        return token;

    } catch (error) {
        throw new Error(error.message);
    }
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        if (!decoded) {
            throw new Error("Token not verified");
        }

        return decoded;

    } catch (error) {
        throw new Error(error.message);
    }
};

export default { createToken, verifyToken };