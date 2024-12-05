import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//Controllers
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bookRoutes from "./routes/books.routes.js";

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/book", bookRoutes);
export default app;
