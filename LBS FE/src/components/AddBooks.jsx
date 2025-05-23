import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import fetchReq from "@/utilityFunctions/fetchReq";

function AddBook() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.frontCover && data.frontCover[0]) {
      formData.append("frontCover", data.frontCover[0]);
      formData.append("isAvailableOnline", data.isAvailableOnline === "on");
    }

    for (const [key, value] of Object.entries(data)) {
      if (key !== "frontCover") {
        if (key === "isAvailableOnline") {
          //   console.log(key);
          continue;
        }
        formData.append(key, value);
      }
    }
    try {
      //   console.log(formData);
      const response = await fetchReq({
        link: "http://localhost:3000/api/v1/admin/add/book",
        method: "POST",
        body: formData,
      });
      //   const result = await response.json();
      if (response.data) {
        toast.success("Book added successfully!");
        // console.log(response.data.title);
        navigate(`/book/:${response.data._id}`);
      } else {
        toast.error(result.message || "Failed to add book.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 px-4">
      <Card className="w-full max-w-lg p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-orange-400">
            Add New Book
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Fill in the details below to add a new book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Title Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="Book Title"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description" className="text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the book"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Front Cover Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="frontCover" className="text-gray-300">
                Front Cover
              </Label>
              <Input
                type="file"
                id="frontCover"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("frontCover", {
                  required: "Front cover is required",
                })}
              />
              {errors.frontCover && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.frontCover.message}
                </p>
              )}
            </div>

            {/* Is Available Online */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="isAvailableOnline"
                {...register("isAvailableOnline")}
                className="bg-gray-700 border-gray-600 text-orange-500"
              />
              <Label htmlFor="isAvailableOnline" className="text-gray-300">
                Available Online
              </Label>
            </div>

            {/* Stocks Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="stocks" className="text-gray-300">
                Stocks
              </Label>
              <Input
                type="number"
                id="stocks"
                placeholder="Number of books in stock"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("stocks", { required: "Stock is required" })}
              />
              {errors.stocks && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.stocks.message}
                </p>
              )}
            </div>

            {/* Authors Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="authors" className="text-gray-300">
                Authors (comma separated)
              </Label>
              <Input
                type="text"
                id="authors"
                placeholder="Author 1, Author 2"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("authors", { required: "Authors are required" })}
              />
              {errors.authors && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.authors.message}
                </p>
              )}
            </div>
            {/* pages */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="pages" className="text-gray-300">
                Pages
              </Label>
              <Input
                type="number"
                id="pages"
                placeholder="pages"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("pages", { required: "Book pages is required" })}
              />
              {errors.pages && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.pages.message}
                </p>
              )}
            </div>

            {/* Barcode Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="publishedDate" className="text-gray-300">
                Published year
              </Label>
              <Input
                type="number"
                id="publishedDate"
                placeholder="Published year of the book"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("publishedDate", {
                  required: "Published Date  is required",
                })}
              />
              {errors.publishedDate && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.publishedDate.message}
                </p>
              )}
            </div>

            {/* Genre Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="genre" className="text-gray-300">
                Genre
              </Label>
              <Input
                type="text"
                id="genre"
                placeholder="Book Genre"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("genre", { required: "Genre is required" })}
              />
              {errors.genre && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>

            {/* Tags Field */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="tags" className="text-gray-300">
                Tags (comma separated)
              </Label>
              <Input
                type="text"
                id="tags"
                placeholder="e.g., Adventure, Fiction"
                className="bg-gray-700 text-gray-200 border border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                {...register("tags")}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition"
            >
              Add Book
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Want to view all books?{" "}
            <span className="text-orange-400 hover:text-orange-500 underline transition cursor-pointer">
              View Library
            </span>
          </p>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default AddBook;
