import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const verifyAnyJwtFunc = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return { error };
  }
};

export const verifyAdminOrUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new apiError(401, "Unothrized request");
    }

    //Trying to verify the user's token first and if there's an error storing it in a variable
    const userDecodedToken = verifyAnyJwtFunc(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    //Verifying the admin's token and returning error
    const adminDecodedToken = verifyAnyJwtFunc(
      token,
      process.env.ACCESS_TOKEN_ADMIN_SECRET
    );
    // console.log({ userDecodedToken, adminDecodedToken });

    if (userDecodedToken?.error && adminDecodedToken?.error) {
      console.log({ userTokenError, adminTokenError });
      throw new apiError(400, "Invalid token");
    }
    const decodedToken = !userDecodedToken?.error
      ? userDecodedToken
      : adminDecodedToken;

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new apiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token");
  }
});
