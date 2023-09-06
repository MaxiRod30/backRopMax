import { productsMockPost } from "../controllers/productsMock.controller.js";
import { Router } from 'express';

const router = Router();

router.post("/mockingproducts",
    passportCall("jwt"),
    productsMockPost)

export default router;
