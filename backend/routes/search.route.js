import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { searchEntities } from "../controllers/search.controller.js";
const router = express.Router();

router.route("/").get(isAuthenticated, searchEntities);



export default router;

