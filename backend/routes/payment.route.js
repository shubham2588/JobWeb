import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { payWithStrip, savePayment } from "../controllers/payment.controller.js";
const router = express.Router();

router.route("/create-subscription").post(isAuthenticated, payWithStrip);
router.route("/verify-payment").post(isAuthenticated, savePayment);



export default router;

