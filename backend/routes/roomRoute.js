import { Router } from "express";
import { createRoom } from "../controllers/roomController.js";
import { joinRoom } from "../controllers/roomController.js";
import { appAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/createRoom", appAuthMiddleware, createRoom);
router.post("/joinRoom", appAuthMiddleware, joinRoom);

export default router;