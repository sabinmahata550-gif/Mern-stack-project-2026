import { Router } from "express";
import pageConteoller from "../controllers/page.conteoller.js";
const pageRouter=Router();

pageRouter.get("/",pageConteoller.homepage)
pageRouter.get("/products",pageConteoller.getAllProductsViews)
pageRouter.get("/product/:id",pageConteoller.getProductsByIdViews)



export default pageRouter;