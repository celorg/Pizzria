import { Router, Request, Response } from "express";

const router = Router();

router.use("/users", require("./userRoutes"));
router.use("/category", require("./categoryRoutes"));
router.use("/product", require("./productRoutes"));
router.use("/order", require("./orderRoutes"));
router.use("/items", require("./itemRoutes"));

export {router}