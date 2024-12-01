import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import base62 from "base62/lib/ascii";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
      },
    ],
    barcode: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
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