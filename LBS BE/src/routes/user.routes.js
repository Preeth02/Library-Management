import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/user.controller.js";
import { verifyUserJWT } from "../middlewares/verifyUserJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdminOrUser } from "../middlewares/userOrAdmin.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAdminOrUser, logoutUser);
router.route("/get/user").post(verifyAdminOrUser, getUser);

export default router;
