import { Router } from "express";
const router = Router();

// Controllers
import {
    addItems,
    removeItem,
} from '../controllers/ItemController';

// Middlewares
import { isAuthenticated } from "../middlewares/isAuthenticated";


// Routes
router.post("/additem", isAuthenticated, addItems);
router.delete("/:id", isAuthenticated, removeItem);

module.exports = router;