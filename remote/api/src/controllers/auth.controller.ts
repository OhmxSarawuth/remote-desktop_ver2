import { Request, Response } from "express";
import { guacLogin } from "../services/auth.service";
import axios from "axios";

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // ส่งข้อมูลต่อไปยัง Guacamole
    console.log("get token");
    console.log(`user: ${username}, password: ${password}`)
    const guacRes = await guacLogin(username, password);

    // คืนผลลัพธ์ให้ React
    res.json({
      authToken: guacRes.authToken,
      username: guacRes.username
    });

  } catch (error: any) {
    console.error("Guacamole login failed:", error?.response?.data || error.message);
    res.status(401).json({ message: "Invalid credentials" });
  }
};