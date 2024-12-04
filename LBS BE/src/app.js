import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//Controllers
import userRoutes from "./routes/user.routes.js";
<<<<<<< HEAD
import adminRoutes from "./routes/admin.routes.js";
=======
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1/user", userRoutes);
<<<<<<< HEAD
app.use("/api/v1/admin", adminRoutes);
=======
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc
export default app;
