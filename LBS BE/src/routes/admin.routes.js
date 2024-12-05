import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/admin.middleware.js";
import {
  loginAdmin,
  addBookToDB,
  deleteBookFromDB,
  updateBook,
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/login").post(loginAdmin);
router.use(verifyAdminJWT);
router.route("/add/book").post(upload.single("frontCover"), addBookToDB);
router.route("/delete/book/:bookId").delete(deleteBookFromDB);
router.route("/update/book/:bookId").patch(updateBook);

export default router;
