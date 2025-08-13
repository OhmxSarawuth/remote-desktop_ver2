import express from "express";
import authRoutes from "./routes/auth.routes";
import hostRoutes from "./routes/host.routes"
import cors from "cors";
import tagTemplateRoutes from "./routes/tagtemplate.routes";
const PORT = 3001;

const app = express();

app.use(cors()); // allow frontend to access
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded
app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", hostRoutes);
app.use("/api", tagTemplateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
