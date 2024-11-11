import { Router } from "express";
import { emailLogin, emailSignup, googleSignup, logout, sendOtp } from "../controllers/authController.js";

const router = Router();

router.get("/google", googleSignup);
router.post("/sendOtp", sendOtp);
router.post("/signUp", emailSignup);
router.post("/login", emailLogin);
router.get("/logout", logout);

export default router;