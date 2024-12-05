import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/verifyUserJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUserJWT, logoutUser);

export default router;
