import productController from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js"
import { Router } from "express";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import { productSchema } from "../libs/schemas/produc.schema.js";
import validate from "../middlewares/validator.js";

const productRouter = Router();
productRouter.get("/brands", auth, productController.getBrand);
productRouter.get("/categories", auth, productController.getCategories);
productRouter.get("/count", auth, productController.getTotalCount);



productRouter.post("/",
    auth, roleBasedAuth(ROLE_MERCHANT), validate(productSchema),
    productController.createMyProduct);
productRouter.get("/", auth, productController.getAllMyProduct);
productRouter.get("/:id", auth, productController.getById);

productRouter.put("/:id", auth, roleBasedAuth(ROLE_MERCHANT), productController.updateMyProduct);
productRouter.delete("/:id", auth, roleBasedAuth(ROLE_ADMIN), productController.deleteMyProduct);

export default productRouter;