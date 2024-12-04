import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/verifyUserJWT.middleware.js";
const router = Router();

router.route("/register", registerUser);
router.route("/login", loginUser);
router.route("/logout", verifyUserJWT, logoutUser);

export default router;
