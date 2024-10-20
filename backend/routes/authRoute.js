import { Router } from "express";
import { googleSignup } from "../controllers/authController.js";

const router = Router();

router.get("/google", googleSignup);

export default router;