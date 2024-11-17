import { Router } from "express";
import { createRoom, getMembers, getRoomDetails } from "../controllers/roomController.js";
import { joinRoom } from "../controllers/roomController.js";
import { appAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/createRoom", appAuthMiddleware, createRoom);
router.post("/joinRoom", appAuthMiddleware, joinRoom);
router.post("/getMembers", appAuthMiddleware, getMembers);
router.post("/getRoomDetails", appAuthMiddleware, getRoomDetails);

export default router;