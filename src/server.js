import express, { request, response } from 'express'
import morgan from 'morgan'
import multer from 'multer'
import config from './config/config.js'
import connectDB from './config/db.js'
import productRouter from './routes/product.route.js'
import authrouter from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.routes.js'
import auth from './middlewares/auth.js'
import router from './routes/order.route.js'
import logger from "./middlewares/logger.js";
const upload = multer({ storage: multer.memoryStorage() })

const app = express()
connectDB();
connectCloudinary();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(logger);
app.get("/", (request, response) => {
    response.json({
        status: "ok",
        version: "0.1.0",
        port: config.port
    })
})
app.use("/api/auth/products", upload.array('images', 5), productRouter);
app.use("/api/auth", authrouter)
app.use("/api/orders", auth, router)
app.use("/api/users", auth, upload.single("images"), userRouter)


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
