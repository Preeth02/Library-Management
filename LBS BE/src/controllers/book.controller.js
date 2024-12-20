import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Book } from "../models/book.models.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

const getBookDetails = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  if (!mongoose.isValidObjectId(bookId)) {
    throw new apiError(400, "Provide a valid book ID");
  }
  const book = await Book.findById(bookId);
  if (!book) {
    throw new apiError(404, "Book with the following ID is not available");
  }
  return res
    .status(200)
    .json(new apiResponse(200, book, "Book fetched successfully"));
});

const borrowBook = asyncHandler(async (req, res) => {
  const user = req.user;
  const { bookId } = req.params;
  if (!mongoose.isValidObjectId(bookId)) {
    throw new apiError(400, "Provide a valid book id");
  }
  if (!(user?.books.length < 3)) {
    throw new apiError(400, "You cannot borrow more than 3 books at a time.");
  }
  if (user.books.some((book) => String(book._id) === bookId)) {
    throw new apiError(400, "You cannot borrow the same book again");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const book = await Book.findById(bookId).session(session);
    if (book?.stocks === 0) {
      throw new apiError(
        409,
        "There are no stocks left you cannot borrow more"
      );
    }

    const borrowedBook = await User.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          books: bookId,
        },
      },
      { new: true, runValidators: true, session }
    ).select("-password -refreshToken");
    if (!borrowedBook) {
      throw new apiError(
        400,
        "Something went wrong while adding book to your slot"
      );
    }
    const bookStock = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          stocks: book.stocks - 1,
        },
      },
      { new: true, session }
    );
    if (!bookStock) {
      throw new apiError(
        409,
        "Something went wrong when updating the book after borrowing"
      );
    }
    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          borrowedBook,
          "Book has been successfully added to your slot"
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new apiError(409, error?.message);
  }
});

const returnBook = asyncHandler(async (req, res) => {
  const user = req.user;
  const { bookId } = req.params;
  if (!mongoose.isValidObjectId(bookId)) {
    throw new apiError(400, "Provide a valid book id");
  }
  if (user?.books.length === 0) {
    throw new apiError(400, "You cannot return books before borrowing.");
  }

  const bookInUser = user?.books.some((book) => String(book) === bookId);
  //   console.log(bookInUser);
  if (!bookInUser) {
    throw new apiError(404, "You have not borrowed the book to return it ");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const book = await Book.findById(bookId).session(session);
    if (!book) {
      throw new apiError(404, "Book with the ID not found");
    }
    const returnedBook = await User.findByIdAndUpdate(
      user._id,
      {
        $pull: { books: bookId },
      },
      { new: true, session }
    ).select("-password -refreshToken");
    if (!returnedBook) {
      throw new apiError(400, "Something went wrong while returning the book");
    }

    const bookStock = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          stocks: book?.stocks + 1,
        },
      },
      { new: true, session }
    );
    if (!bookStock) {
      throw new apiError(
        409,
        "There was an error while updating the stock after returning the book"
      );
    }
    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          returnedBook,
          "Book has been returned successfully"
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new apiError(409, error?.message);
  }
});

const getAllBookWithFilters = asyncHandler(async (req, res) => {
  const { page = 1, limit, query, sortBy, sortType } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    customLabels: {
      totalDocs: "totalBooks",
      docs: "books",
      limit: "pageSize",
      page: "currentPage",
      nextPage: "next",
      prevPage: "previous",
      totalPages: "pageCount",
      hasNextPage: "hasMore",
      hasPrevPage: "hasBefore",
      pagingCounter: "counter",
      meta: "paginationDetails",
    },
  };
  const myAggregate = Book.aggregate();
  if (sortBy && sortType) {
    myAggregate.sort({ [sortBy]: sortType == "asc" ? 1 : -1 });
  }
  const filter = {};
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
      { genre: { $regex: query, $options: "i" } },
      { authors: { $regex: query, $options: "i" } },
    ];
  }
  await myAggregate.match(filter);
  const result = await Book.aggregatePaginate(myAggregate, options);
  if (!result) {
    throw new apiError(404, "Unable to fetch the books");
  }
  return res
    .status(200)
    .json(
      new apiResponse(200, result, "Books with filters fetched successfully")
    );
});

export { getBookDetails, borrowBook, returnBook, getAllBookWithFilters };
