import mongoose from "mongoose";
import { PAYMENT_METCHOD_CARD, PAYMENT_METCHOD_CASH, PAYMENT_METCHOD_ONLINE, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_PENDING, PAYMENT_STATUS_SUCCESS } from "../constants/payment.js";
const paymentSchema = new mongoose.Schema({
    transactionId: String,
    amount: {
        type: Number,
        required: [true, "Payment amout is required."]
    },
    method: {
        type: String,
        required: [true, "Payment method is required"],
        enum: [PAYMENT_METCHOD_CASH, PAYMENT_METCHOD_CARD, PAYMENT_METCHOD_ONLINE]
    },
    status: {
        type: String,
        default: PAYMENT_STATUS_PENDING,
        enum: [PAYMENT_STATUS_PENDING, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_SUCCESS],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    }
})

export default mongoose.model("Payment", paymentSchema)