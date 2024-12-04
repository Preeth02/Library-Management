import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    books: [
      {
        types: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

<<<<<<< HEAD
userSchema.method.generateAccessToken = async function (tokenSecret) {
=======
userSchema.method.generateAccessToken = async function () {
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
<<<<<<< HEAD
    tokenSecret,
=======
    process.env.ACCESS_TOKEN_SECRET,
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

<<<<<<< HEAD
userSchema.method.genereteRefreshToken = async function (tokenSecret) {
=======
userSchema.method.genereteRefreshToken = async function () {
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc
  return jwt.sign(
    {
      _id: this._id,
    },
<<<<<<< HEAD
    tokenSecret,
=======
    process.env.REFRESH_TOKEN_SECRET,
>>>>>>> 695909d090a83bfa0010831facd1141ce70e93bc
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
