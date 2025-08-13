import { Request, Response } from "express";
import { getTags } from "../services/host.service";


export const tagController = async (req: Request, res: Response) => {
  try {
    const host_id = req.query.host_id ? Number(req.query.host_id) : undefined;
    const tags = await getTags(host_id);
    console.log(tags)
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
