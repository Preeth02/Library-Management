import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { Book } from "../models/book.models.js";
import { generateTokens } from "./user.controller.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!(email || username)) {
    throw new apiError(401, "Email or username is required");
  }
  const admin = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!admin) {
    throw new apiError(404, "User with the email or username is not found");
  }
  if (!(admin.role === process.env.ADMIN_ROLE)) {
    throw new apiError(400, "Access Denied");
  }
  if (!password) {
    throw new apiError(401, "Password is required");
  }

  const isValidPassword = await admin.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new apiError(400, "Invalid admin credentials");
  }
  const { accessToken, refreshToken } = await generateTokens(
    admin?._id,
    process.env.ACCESS_TOKEN_ADMIN_SECRET,
    process.env.REFRESH_TOKEN_ADMIN_SECRET
  );

  const loggedInAdmin = await User.findById(admin?._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        { admin: loggedInAdmin, accessToken, refreshToken },
        "Admin logged in successfully"
      )
    );
});

const addBookToDB = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    isAvailableOnline,
    stocks,
    authors,
    genre,
    tags,
    publishedDate,
  } = req.body;
  if (
    [title, description, stocks, authors, genre, publishedDate].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new apiError(400, "All the fields are required");
  }

  const frontCoverLocalPath = req?.file?.path;
  if (!frontCoverLocalPath) {
    throw new apiError(400, "Front cover page is required");
  }

  const frontCover = await uploadOnCloudinary(frontCoverLocalPath);
  if (!frontCover) {
    throw new apiError(
      400,
      "Something went wrong while uploading the front cover to the cloudinary"
    );
  }

  const barcode = Math.floor(
    Math.random() * 1000000000 + Math.floor(Math.random() * 1000000000)
  );
  // console.log(barcode);
  let book;
  try {
    book = await Book.create({
      title,
      description,
      frontCover: frontCover.url,
      isAvailableOnline,
      stocks,
      authors: authors.split(" "),
      genre,
      publishedDate,
      tags: tags ? tags.split(" ") : [],
      barcode: barcode,
    });
    if (!book) {
      throw new apiError(400, "Something went wrong while creating the book");
    }
  } catch (error) {
    const frontCoverPath = frontCover?.url?.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(frontCoverPath);

    throw new apiError(
      error?.status || 400,
      error?.message || "Something went wrong while creating the book"
    );
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, book, "Book added to the database successfully")
    );
});

const deleteBookFromDB = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  if (!mongoose.isValidObjectId(bookId)) {
    throw new apiError(400, "Provide a valid book ID");
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const book = await Book.findById(bookId).session();
    if (!book) {
      throw new apiError(404, "Book with teh following ID is not found");
    }
    const frontCover = book.frontCover.split("/").pop().split(".")[0];
    // console.log(frontCover);

    const result = await cloudinary.uploader.destroy(frontCover);
    // console.log(result);
    if (!result) {
      throw new apiError(
        400,
        "Something went wrong try to delete the book again"
      );
    }

    await Book.findByIdAndDelete(bookId).session();

    session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json(new apiResponse(200, {}, "Book deleted successfully"));
  } catch (error) {
    session.abortTransaction();
    session.endSession;
    throw new apiError(
      error?.status || 409,
      error?.message || "Something went wrong while deleting the book"
    );
  }
});

const updateBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  if (!mongoose.isValidObjectId(bookId)) {
    throw new apiError(400, "Provide a valid book ID");
  }
  const {
    title,
    description,
    isAvailableOnline,
    stocks,
    authors,
    genre,
    tags,
    publishedDate,
  } = req.body;
  
  if (
    [title, description, stocks, authors, genre, publishedDate].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new apiError(400, "All the fields are required");
  }

  const book = await Book.findByIdAndUpdate(
    bookId,
    {
      $set: {
        title,
        description,
        stocks,
        authors,
        genre,
        isAvailableOnline,
        tags: tags?.length > 0 ? tags : "",
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
console.log(book)
  if (!book) {
    throw new apiError(400, "Something  wrong while updating the book");
  }

  return res
    .status(201)
    .json(new apiResponse(200, book, "Book has been updated successfully"));
});

export { loginAdmin, addBookToDB, deleteBookFromDB, updateBook };
