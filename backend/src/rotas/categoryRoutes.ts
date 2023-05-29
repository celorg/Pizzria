import { Router } from "express";
const router = Router();

// Controllers
import { 
    createCategory,
    getAllCategories,
    
} from "../controllers/CategoryController";

// Middlewares
import { isAuthenticated } from "../middlewares/isAuthenticated";

// Routes
router.post("/create", isAuthenticated, createCategory);
router.get("/", isAuthenticated ,getAllCategories);

module.exports = router;