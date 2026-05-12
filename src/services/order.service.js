import mongoose from "mongoose";
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMD } from "../constants/orderstatus.js";
import { PAYMENT_METCHOD_ONLINE, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_SUCCESS } from "../constants/payment.js";
import Order from "../models/Order.js"
import Payment from "../models/Payment.js";
import { payViaKhalti } from "../utils/payment.js";
import userService from "./user.service.js";
const getOrders = async () => {
    return (await Order.find())
        .sort({ createAt: -1 })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async (id) => {
    const order = await Order.findById(id)
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price imageUrls")
        .populate("payment", "transactionId amout metod status")
    if (!order) throw {
        status: 400,
        message: "Order not found"
    }
    return order;
};

const createOrder = async (data, authUser) => {
    // console.log("AuthUser Data:", authUser);
    const user = await userService.getById(authUser.id,authUser);
    if (!data.shippingAddress) {
        data.shippingAddress = user.address;
    }
    data.orderNumber = crypto.randomUUID();
    data.user = authUser.id;
    return await Order.create(data)
}
const updateStatusOrder = async (id, status) => {
    return await Order.findByIdAndUpdate(id, { status }, { new: true })
};

const cancelOrder = async (id) => {
    return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS_CANCELLED }, { new: true })

};

const deleteOrder = async (id) => {
    await Order.findByIdAndDelete(id)

};

const confirmOrder = async (id, status) => {
    const order = await getOrderById(id);
    if (!status?.toUpperCase() == PAYMENT_STATUS_SUCCESS) {
        await Payment.findByIdAndUpdate(order.payment, {
            status: PAYMENT_STATUS_FAILED
        })

        throw {
            status: 400,
            message: "Payment failed"
        }
        await Payment.findByIdAndUpdate(order.payment, {
            status: PAYMENT_STATUS_FAILED
        })
    }

    await Payment.findByIdAndUpdate(order.payment, {
        status: PAYMENT_STATUS_SUCCESS
    })
    return await Order.findByIdAndUpdate(id, { status: ORDER_STATUS_CONFIRMD }, { new: true })

};

const  getOrderByUser= async (userId) => {
    return await Order.find({ user: userId })
        .populate("user", "name email phone")
        .populate("orderItems.product", "name brand category price imageUrls");

};

const getOrderBymerchant = async (merchantId) => {
    console.log(merchantId)
  return await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "orderUser",
      },
    },
    {
      $unwind: "$orderUser",
    },
    {
      $lookup: {
        from: "products",
        localField: "orderItems.product",
        foreignField: "_id",
        as: "orderedProducts",
        
      },
    
    },
    { $unwind: "$orderedProducts" }, // Yo step thapnus
    {
      $match: {
        "orderedProducts.createdBy": new mongoose.Types.ObjectId(merchantId),
      },
    },
    {
      $project: {
        orderNumber: 1,
        payment: 1,
        shippingAddress: 1,
        status: 1,
        totalPrice: 1,
        "orderUser._id": 1,
        "orderUser.name": 1,
        "orderUser.email": 1,
        "orderUser.phone": 1,
        "orderedProducts._id": 1,
        "orderedProducts.name": 1,
        "orderedProducts.price": 1,
        "orderedProducts.brand": 1,
        "orderedProducts.category": 1,
        "orderedProducts.imageUrls": 1,
      },
    },
  ]);
};
const orderPaymentViaCash = async (id) => {
    const order = await getOrderById(id)
    const orderPayment = await Payment.create({
        method: "CASH",
        amount: order.totalPrice,
    });

    return await Order.findByIdAndUpdate(id, {
        status: ORDER_STATUS_CONFIRMD,
        payment: orderPayment.id,
    }, { new: true })
}

const orderPaymentViaKhalti = async (id) => {
    // Get order
    const order = await getOrderById(id);
    console.log(order)
    if (!order) {
        throw new Error("Order not found");
    }

    // Create payment record
    const orderPayment = await Payment.create({
        method: PAYMENT_METCHOD_ONLINE,
        amount: order.totalPrice,
    });

    // Update order with payment id
    await Order.findByIdAndUpdate(id, {
        payment: orderPayment._id,
    });

    // Khalti payment init
    return await payViaKhalti({
        amount: order.totalPrice,
        purchaseOrderId: order.orderNumber,
        purchaseOrderName:
            order.orderItems?.[0]?.product?.name || "Order Payment",

        customerInfo: {
            name: order.user.name,
            email: order.user.email,
            phone: order.user.phone,
        },
    });
};
export default {
    getOrders,
    getOrderById,
    createOrder,
    updateStatusOrder,
    cancelOrder,
    deleteOrder,
    confirmOrder,
    getOrderByUser,
    orderPaymentViaCash,
    orderPaymentViaKhalti,
    getOrderBymerchant
}