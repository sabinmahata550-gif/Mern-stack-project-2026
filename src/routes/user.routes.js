import userController from "../controllers/user.controller.js";
import { Router } from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/roles.js";
const userRouter=Router();
userRouter.get("/",roleBasedAuth(ROLE_ADMIN),userController.getAllUser)
userRouter.put("/profile-image",userController.updateProfileImage)
userRouter.get("/:id",userController.getById)
userRouter.post("/",roleBasedAuth(ROLE_ADMIN), userController.createUser)
userRouter.put("/:id",userController.updateUser)
userRouter.delete("/:id",roleBasedAuth(ROLE_ADMIN),userController.deleteUser)
userRouter.patch("/:id/roles", roleBasedAuth(ROLE_ADMIN), userController.updateuserRoles);

export default userRouter;