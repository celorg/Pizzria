import { Router } from "express";
const router = Router()

// Controller
import {
    login,
    register,
    detailsUser
} from '../controllers/UserController'

// Middlewares
import { isAuthenticated } from "../middlewares/isAuthenticated";

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuthenticated, detailsUser);

module.exports = router