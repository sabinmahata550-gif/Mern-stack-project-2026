import authController from "../controllers/auth.controller.js";
import { Router } from "express";
const authrouter = Router();
import validator from "../middlewares/validator.js";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from "../libs/schemas/auth.schema.js";
import { registerSchema } from "../libs/schemas/auth.schema.js";
import validate from "../middlewares/validator.js";

authrouter.post("/register", validate(registerSchema), authController.userRegister)
authrouter.post("/login", validate(loginSchema), authController.userlogin);
authrouter.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
authrouter.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);

export default authrouter