import { Router } from "express";
import {
  getBookDetails,
  borrowBook,
  returnBook,
  getAllBookWithFilters,
  getCollections,
} from "../controllers/book.controller.js";
import { verifyAdminOrUser } from "../middlewares/userOrAdmin.middleware.js";
import { verifyUserJWT } from "../middlewares/verifyUserJWT.middleware.js";
const router = Router();

router.route("/get-book/:bookId").get(verifyAdminOrUser, getBookDetails);
router.route("/get-books").get(verifyAdminOrUser, getAllBookWithFilters);
router.route("/get-collections").get(verifyAdminOrUser, getCollections);
router.use(verifyUserJWT);
router.route("/borrow/book/:bookId").patch(borrowBook);
router.route("/return/book/:bookId").patch(returnBook);

export default router;
