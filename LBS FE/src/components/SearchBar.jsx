import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

function SearchBar() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const search = async (data) => {
    if (data?.query?.trim().length > 0) {
      document.activeElement.blur();
      navigate(`/all-books/${data.query}`);
    }
    // reset();
  };
  return (
    <form
      className="bg-gray-900 sticky top-0 flex justify-between"
      onSubmit={handleSubmit(search)}
    >
      <div className="flex justify-between items-center w-3/5 bg-gray-800 rounded-lg px-4 py-2 mb-4 mt-1">
        <Input
          placeholder="search"
          className="bg-gray-800 outline-none border-gray-500 w-10/12"
          {...register("query")}
        />
        <Button className="bg-blue-500 hover:bg-blue-600 " type="submit">
          Search
        </Button>
      </div>
      <Avatar className="flex my-2">
        <AvatarImage
          src={`${user?.avatar}`}
          className="object-cover object-top"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </form>
  );
}

export default SearchBar;
