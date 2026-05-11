import ResetPassword from '../models/ResetPassword.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import sendEmail from '../utils/email.js';
import { ROLE_ADMIN } from '../constants/roles.js';
const register = async (data) => {
    console.log("data is",data)
    try {
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            throw new Error("User already exists");
        }
        
        if (data.roles != ROLE_ADMIN) {
            delete data.roles;

        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const createuser = await User.create({
            ...data,
            password: hashPassword
        });
        return {
            name: createuser.name,
            id: createuser._id,
            phone: createuser.phone,
            address: createuser.address,
            email: createuser.email,
            roles: createuser.roles
        };;
    } catch (error) {
        throw new Error(error.message);
    }
};

const login = async (data) => {
    try {
        const user = await User.findOne({
            $or: [{ email: data.email }, { phone: data.phone },]
        });

        if (!user) {
            throw new Error("User not found");
        }

        const matchPassword = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!matchPassword) {
            throw new Error("Password does not match");
        }
        if (!user.isActive) {
            throw {
                status: 400,
                message: "User is inactive.",
            };
        }
        return {
            name: user.name,
            id: user._id,
            phone: user.phone,
            address: user.address,
            email: user.email,
            roles: user.roles
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw {
            status: 404,
            message: "User not found"
        }
    }
    const token = crypto.randomUUID();

    await ResetPassword.create({
        userId: user._id,
        token: token,
    })

    const link = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;
    sendEmail({
        recipient: email,
        subject: "Reset password link",
        html: `
      <div
        style="
          padding: 16px;
          font-family: sans-serif
        "
      >
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${link}"
          style="
            background-color: steelblue;
            color: white;
            text-decoration: none;
            padding: 8px 32px;
            border-radius: 5px;
          "
          >Reset password</a
        >
      </div>
    `,
    });
    return {
        message: "Reset Password link sent to your email."
    }
}

const resetPassword = async (input) => {
    const data = await ResetPassword.findOne({
        userId: input.userId,
        expiresAt: { $gt: Date.now() },
    }).sort({ createdAt: -1 });

    if (!data || data.token !== input.token) {
        throw {
            status: 400,
            message: "Invalid or expired link."
        };
    }

    if (data.isUsed) {
        throw {
            status: 400,
            message: "Link already used."
        };
    }

    const hashPassword = await bcrypt.hash(input.password, 10);

    // FIX 1: Filter lai object ma halne { _id: ... } ya findByIdAndUpdate use garne
    await User.findByIdAndUpdate(input.userId, {
        password: hashPassword
    });

    // FIX 2: ResetPassword ko record update garda record ko afnai ID (_id) use garne
    // data.userId haina, data._id use garnus
    await ResetPassword.findByIdAndUpdate(data._id, {
        isUsed: true
    });

    return {
        message: "Password reset successfully."
    };
};
export default { register, login, forgotPassword, resetPassword };