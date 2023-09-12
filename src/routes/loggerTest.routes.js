import { Router } from 'express';
import { passportCall } from '../helpers/helpersPassportCall.js';
import { loggerTestGet } from "../controllers/loggerTest.controller.js"

const router = Router();

router.get("/loggerTest",
    passportCall("jwt"),
    loggerTestGet )

export default router;