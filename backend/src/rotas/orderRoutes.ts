import { Router } from "express";
const router = Router();

// Controllers
import {
    createOrder,
    deleteOrder,
    sendOrder,
    latestOrders,
    detailsOrder,
    finishOrder
} from '../controllers/OrderController';

// Middlewares
import { isAuthenticated } from "../middlewares/isAuthenticated";

// Routes
router.post("/create", isAuthenticated, createOrder);
router.delete("/:id", isAuthenticated, deleteOrder);
router.patch("/:id", isAuthenticated, sendOrder);
router.get("/lastest", isAuthenticated, latestOrders);
router.get("/details/:id", isAuthenticated, detailsOrder);
router.patch("/concluid/:id", isAuthenticated, finishOrder);

module.exports = router