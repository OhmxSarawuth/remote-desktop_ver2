import express, { response } from "express";


const router = express.Router();

router.get("/", ()=>{
    response.status(200).json("yes you can do it!!");
}); // GET /

export default router;
