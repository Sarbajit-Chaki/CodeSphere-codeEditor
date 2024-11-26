import { Router } from "express";
import { emailLogin, emailSignup, googleSignup, logout, resetPassword, sendMailForgotPassword, sendOtp, verifyToken } from "../controllers/authController.js";

const router = Router();

router.get("/google", googleSignup);
router.post("/sendOtp", sendOtp);
router.post("/signUp", emailSignup);
router.post("/login", emailLogin);
router.get("/logout", logout);
router.post("/forgotPass", sendMailForgotPassword);
router.post("/verifyToken", verifyToken);
router.post("/resetPassword", resetPassword);

export default router;