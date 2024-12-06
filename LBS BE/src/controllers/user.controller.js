import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

const generateTokens = async (
  userID,
  accessTokenSecret,
  refreshTokenSecret
) => {
  const user = await User.findById(userID);
  const accessToken =await user.generateAccessToken(accessTokenSecret);
  const refreshToken =await user.genereteRefreshToken(refreshTokenSecret);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }
  const userExisted = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (userExisted) {
    throw new apiError(409, "User with email or username already existed");
  }
  const avatarLocalPath = req?.file?.path;
  console.log(avatarLocalPath);
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new apiError(400, "Something went wrong while uploading avatar ");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatar.url,
    role: process.env.USER_ROLE || "USER",
  });
  if (!user) {
    throw new apiError(400, "There was a error while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new apiError(400, "Username or email is required");
  }
  const isUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!isUser) {
    throw new apiError(404, "User doesn't exist");
  }
  const isValidPassword = await isUser.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new apiError(400, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await generateTokens(
    isUser._id,
    process.env.ACCESS_TOKEN_SECRET,
    process.env.REFRESH_TOKEN_SECRET
  );

  const loggedInUser = await User.findById(isUser._id).select(
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
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      // $set: { refreshToken: undefined },
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser, generateTokens };
