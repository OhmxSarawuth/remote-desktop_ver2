import express from "express";
import { hostController } from "../controllers/host.controller";
import { hostInfoController } from "../controllers/host.controller";
import { tagController } from "../controllers/tag.controller";

const router = express.Router();


// GET /api/hosts
router.get("/hosts", hostController);

// GET /api/hostinfo/:host_id
router.get("/hostinfo/:host_id", hostInfoController);

// GET /api/tags (optionally filter by host_id)
router.get("/tags", tagController);

export default router;
