import express from "express";
import { loginController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/tokens", loginController); // POST /api/tokens

export default router;
