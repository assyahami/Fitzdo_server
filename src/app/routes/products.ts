import express from "express";
const router = express.Router();

import {
    getProducts,
    getProductsDetails,
    searchProducts,
} from "../controllers/Products/products.controller";

router.get("/", getProducts);
router.get("/:id", getProductsDetails);
router.get("/search/:search", searchProducts);

export default router;