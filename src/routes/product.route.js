import { Router } from "express";
import productController from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { productSchema } from "../libs/schemas/produc.schema.js";

const productRouter = Router();


// Get all brands
productRouter.get("/brands", productController.getBrand);

// Get all categories
productRouter.get("/categories", productController.getCategories);

// Get total products count
productRouter.get("/count", productController.getTotalCount);

// Get all products
productRouter.get("/", productController.getAllMyProduct);

// Get single product
productRouter.get("/:id", productController.getProductById);



// Create Product (Merchant Only)
productRouter.post(
  "/",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  validate(productSchema),
  productController.createMyProduct
);

// Update Product (Merchant Only)
productRouter.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.updateMyProduct
);

// Delete Product (Admin Only)
productRouter.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  productController.deleteMyProduct
);

export default productRouter;