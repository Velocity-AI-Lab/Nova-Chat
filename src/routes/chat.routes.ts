import { Router } from "express";
import { getGeminiChat } from "../controllers/chat.controller";

const router = Router();

// chat route
router.post("/chat", getGeminiChat);

export default router;
