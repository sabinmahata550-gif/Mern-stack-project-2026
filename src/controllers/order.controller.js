import { json } from "zod";
import orderService from "../services/order.service.js";

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders)
    } catch (error) {
        res.status(400).json(error.message)

    }
}
const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)


    }
}
const createOrder = async (req, res) => {
    try {
        const createOrder = await orderService.createOrder(req.body, req.user)
        res.json(createOrder)

    } catch (error) {
        res.status(400).json(error.message)

    }
}
const updateStatusOrder = async (req, res) => {
    if (!req.body?.status)
        return res.status(400).json({ message: "Status is required" })
    try {
        const order = await orderService.updateStatusOrder(req.params.id, req.body.status)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)

    }
}
const cancelOrder = async (req, res) => {
    try {
        const order = await orderService.cancelOrder(req.params.id)
        res.json(order)

    } catch (error) {
        res.status(400).json(error.message)

    }
}
const deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id)
        res.json({ message: "order deleted." })
    } catch (error) {
        res.status(400).json(error.message)

    }
}

const confirmOrder = async (req, res) => {
    try {
        const order = await orderService.confirmOrder(req.params.id,req.body)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)

    }
}


const getOrderBymerchant = async (req, res) => {
    try {
        const orders= await orderService.getOrderBymerchant(req.user.id)
       
        res.json(orders)
    } catch (error) {
        res.status(400).json(error.message)

    }
}


const getOrderByUser = async (req, res) => {
    try {
        const order = await orderService.getOrderByUser(req.user.id)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)

    }
}

const orderPaymentViaCash= async (req, res) => {
    try {
        const order = await orderService.orderPaymentViaCash(req.params.id)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)

    }
}

const orderPaymentViaKhalti= async (req, res) => {
    try {
        const order = await orderService.orderPaymentViaKhalti(req.params.id)
        res.json(order)
    } catch (error) {
        res.status(400).json(error.message)

    }
}
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