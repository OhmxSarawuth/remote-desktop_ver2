import { Request, Response } from "express";
import { getHosts, getHostInfo, getTags } from "../services/host.service";

// GET /api/hosts
export const hostController = async (req: Request, res: Response) => {
  try {
    const hosts = await getHosts();
    res.json(hosts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/hostinfo/:host_id
export const hostInfoController = async (req: Request, res: Response) => {
  try {
    const host_id = Number(req.params.host_id);
    const info = await getHostInfo(host_id);
    if (!info) return res.status(404).json({ message: "Host not found" });
    res.json(info);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

