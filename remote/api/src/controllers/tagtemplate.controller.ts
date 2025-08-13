import { Request, Response } from "express";
import { getTagTypesService, getTagInfosService } from "../services/tagtemplate.service";

export const getTagTypes = async (req: Request, res: Response) => {
  console.log("get tag")
  try {
    const types = await getTagTypesService();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tag types" });
  }
};

export const getTagInfos = async (req: Request, res: Response) => {
  console.log("get tag infos")
  try {
    const { type } = req.query;
    console.log("get TAg infos :" + type)
    if (!type || typeof type !== "string") {
      return res.status(400).json({ error: "Missing or invalid tag type" });
    }
    const infos = await getTagInfosService(type);
    res.json(infos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tag infos" });
  }
};
