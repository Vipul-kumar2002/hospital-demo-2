import express from "express";
import { transcribeHandwriting } from "../controllers/aiController.js";
const router = express.Router();

// This endpoint will be: POST /api/ai/transcribe
router.post("/transcribe", transcribeHandwriting);

export default router;
