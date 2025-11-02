import express from "express";
import { getUserCount } from "../controllers/authController";

const router = express.Router();

router.get("/count", getUserCount);

export default router;