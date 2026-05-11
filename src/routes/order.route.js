import orderController from "../controllers/order.controller.js";
import { Router } from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../constants/roles.js";

const router = Router();
router.get("/",roleBasedAuth(ROLE_ADMIN), orderController.getOrders);
router.get("/merchant",orderController.getOrderBymerchant);
router.post("/",roleBasedAuth(ROLE_CUSTOMER),orderController.createOrder);
router.get("/user",roleBasedAuth(ROLE_CUSTOMER),orderController.getOrderByUser);
router.get("/:id", orderController.getOrderById);
router.put("/:id/status",roleBasedAuth(ROLE_ADMIN),orderController.updateStatusOrder);
router.patch("/:id/cancel",roleBasedAuth(ROLE_CUSTOMER),orderController.cancelOrder);
router.put("/:id/confirm",roleBasedAuth(ROLE_CUSTOMER),orderController.confirmOrder);
router.delete("/:id",roleBasedAuth(ROLE_ADMIN),orderController.deleteOrder);
router.put("/:id/payment/cash",roleBasedAuth(ROLE_CUSTOMER),orderController.orderPaymentViaCash);
router.put("/:id/payment/khalti",roleBasedAuth(ROLE_CUSTOMER),orderController.orderPaymentViaKhalti);




export default router