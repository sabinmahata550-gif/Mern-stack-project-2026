import mongoose from "mongoose";
import { required } from "zod/mini";

const resetpasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "UserId is required."]
    },
    token: {
        type: String,
        required: [true, "Reset password token is required."]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 3600000,
        immutable: true,
    },
    isUsed: {
        type: Boolean,
        default: false
    }
})

const ResetPassword = mongoose.model("ResetPassword", resetpasswordSchema);

export default ResetPassword;