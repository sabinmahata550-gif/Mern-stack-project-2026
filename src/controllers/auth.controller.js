import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const userRegister = async (req, res) => {
    try {
        const input = req.body;

        if (!input.email || !input.password) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const user = await authService.register(input);

        const token = jwt.createToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 86400 * 1000
        });

        res.status(201).json({
            message: 'User registered successfully',
            data: user,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'User register failed',
            error: error.message
        });
    }
};

const userlogin = async (req, res) => {
    try {
        const input = req.body;

        const user = await authService.login(input);

        const token = jwt.createToken({ user });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 86400 * 1000
        });

        res.status(200).json({
            message: 'User login successfully',
            data: user,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'User login failed',
            error: error.message
        });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const input = req.body;

        const data = await authService.forgotPassword(input?.email);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.status || 400).json({
            error: error.message
        });
    }
}


    const resetPassword = async (req, res) => {
    try {
        const input = req.body;

        const data = await authService.resetPassword(input);
        res.status(200).json(data);
    } catch (error) {
        res.status(error.status || 400).json({
            error: error.message
        });
    }
};



export default { userRegister, userlogin, forgotPassword,resetPassword};