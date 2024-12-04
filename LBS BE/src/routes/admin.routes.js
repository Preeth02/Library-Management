import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/admin.middleware.js";
import {
  loginAdmin,
  addBookToDB,
  deleteBookFromDB,
  updateBook,
} from "../controllers/admin.controller.js";
const router = Router();

router.route("/login").post(loginAdmin);
router.use(verifyAdminJWT);
router.route("/addBook").post(addBookToDB);
router.route("/deleteBook").delete(deleteBookFromDB);
router.route("/updateBook").patch(updateBook);

export default router;
