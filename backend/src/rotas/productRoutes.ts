import { Router } from "express";
import multer from "multer";
const router = Router();

// Controllers
import { 
    createProduct,
    getProductsByCategory,
    deleleProduct
 } from "../controllers/ProductController";

// Middlewares
import { isAuthenticated } from "../middlewares/isAuthenticated";

import uploadConfig from '../config/multer';

const upload = multer(uploadConfig.upload("./public"));

// Routes
router.post("/create", isAuthenticated, upload.single("file"), createProduct);
router.get("/:id", isAuthenticated, getProductsByCategory);
router.delete("/:id", isAuthenticated, deleleProduct);

module.exports = router