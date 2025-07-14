import express from 'express';
import cors from 'cors'; // ใช้ import เพื่อความสอดคล้องกับ ES Modules
import gucadRouter from './routes/guca';

const app = express();
const PORT = 3001;

// Middleware สำหรับ CORS
app.use(cors({
  origin: 'http://localhost:3000', // หรือ port ที่ React ใช้
  credentials: true
}));

// Middleware สำหรับการอ่าน JSON body
app.use(express.json());

// กำหนด route สำหรับ Guacamole API
app.use('/api/guac', gucadRouter);

// เริ่มต้น Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});