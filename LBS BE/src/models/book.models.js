import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import base62 from "base62/lib/ascii.js";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    frontCover: {
      type: String,
      required: true,
    },
    isAvailableOnline: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    stocks: {
      type: Number,
      required: true,
    },
    authors: [
      {
        type: String,
        required: true,
        index: true,
      },
    ],
    barcode: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      index: true,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    publishedDate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

bookSchema.pre("save", async (next) => {
  if (this.barcode) {
    return next();
  }
  this.barcode = base62.encode(this._id.toString());
  next();
});

bookSchema.plugin(mongooseAggregatePaginate);

export const Book = mongoose.model("Book", bookSchema);