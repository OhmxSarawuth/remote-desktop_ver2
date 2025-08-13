import express from "express";
import { getTagTypes, getTagInfos } from "../controllers/tagtemplate.controller";

const router = express.Router();

router.get("/tagtemplate", getTagTypes);
router.get("/tagtemplate/info", getTagInfos);

export default router;
