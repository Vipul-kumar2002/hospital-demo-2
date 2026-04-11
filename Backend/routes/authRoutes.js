import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// This will be: POST http://localhost:8000/api/auth/login
router.post("/login", login);

export default router;
