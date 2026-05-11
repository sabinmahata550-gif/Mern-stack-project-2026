import mongoose from "mongoose";
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMD, ORDER_STATUS_DELIVERY, ORDER_STATUS_PENDING, ORDER_STATUS_SHIPPED } from "../constants/orderstatus.js";
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "Product is required"]
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, "Quantity must be at least 1."]
            },
        }
    ],
    status: {
        type: String,
        default: ORDER_STATUS_PENDING,
        enum: [
            ORDER_STATUS_PENDING,
            ORDER_STATUS_CONFIRMD,
            ORDER_STATUS_SHIPPED,
            ORDER_STATUS_DELIVERY,
            ORDER_STATUS_CANCELLED,
        ]
    },
    shippingAddress: {
        city: {
            type: String,
            required: true
        },

        province: {
            type: String,
            required: true
        },

        country: {
            type: String,
            default: 'Nepal'
        }
    },
    orderNumber: {
        type: String,
        required: [true, "Order number ia required"]
    },
    totalPrice: {
        type: String,
        requires: [true, "Total price is required"]

    },
    payment: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        immutable: true,
    }
})

export default mongoose.model("Order", orderSchema)