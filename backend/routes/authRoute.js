import { Router } from "express";
import { emailSignup, googleSignup, sendOtp } from "../controllers/authController.js";

const router = Router();

router.get("/google", googleSignup);
router.post("/sendOtp", sendOtp);
router.post("/signUp", emailSignup);

export default router;