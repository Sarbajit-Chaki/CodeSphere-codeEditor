import { Router } from "express";
import { deleteUser, getUser, updatePassword, updateProfile } from "../controllers/userController";
import { appAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.put("/updateProfile", appAuthMiddleware, updateProfile);
router.put("/updatePassword", appAuthMiddleware, updatePassword);
router.put("/deleteUser", appAuthMiddleware, deleteUser);
router.put("/getUser", appAuthMiddleware, getUser);

export default router;