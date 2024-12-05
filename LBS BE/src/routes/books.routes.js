import { Router } from "express";
import {
  getBookDetails,
  borrowBook,
  returnBook,
  getAllBookWithFilters,
} from "../controllers/book.controller.js";
import { verifyAdminOrUser } from "../middlewares/userOrAdmin.middleware.js";
import { verifyUserJWT } from "../middlewares/verifyUserJWT.middleware.js";
const router = Router();

router.route("/get-book/:bookId").get(verifyAdminOrUser, getBookDetails);
router.use(verifyUserJWT);
router.route("/borrow/book/:bookId").patch(borrowBook);
router.route("/return/book/:bookId").patch(returnBook);
router.route("/get-books").get(getAllBookWithFilters);

export default router;
