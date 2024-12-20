import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import fetchReq from "@/utilityFunctions/fetchReq";
import { AlertDestructive } from "../AlertDes";
import { useNavigate } from "react-router-dom";
import { addBooks } from "@/store/bookSlice";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar";

function Home() {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const bookDetails = await fetchReq({
        link: "http://localhost:3000/api/v1/book/get-books",
      });
      if (bookDetails.error) {
        setError(bookDetails.error?.message);
        return;
      } else {
        setBooks(bookDetails.data);
        dispatch(addBooks(bookDetails.data));
      }
    })();
    return () => {
      setBooks(null);
      setError(null);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col flex-1 p-4">
      {/* Search Bar */}
      <SearchBar />
      {/* Featured Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-2">Frank Miller</h3>
        <p className="text-3xl font-bold mb-4">Batman: The Dark Knight</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          View Details
        </button>
      </div>
      <div className="min-w-full gap-6 ">
        {/* Top Rated Comics */}
        <div>
          <h3 className="text-lg font-bold mb-4">Top Rated Books</h3>
          {error !== null && (
            <AlertDestructive message="Error has occured while fetching books. Reload the page"></AlertDestructive>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {/* Comic Cards */}
            {books?.books &&
              books.books?.map((book) => (
                <div
                  key={book?._id}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col w-full flex-1 items-center cursor-pointer"
                  onClick={() => navigate(`/book/:${book._id}`)}
                >
                  <div className="bg-gray-600 w-1/2 h-40 rounded-lg m-1 p-3 flex">
                    <img
                      src={book.frontCover}
                      alt={book.title}
                      className="w-full "
                    />
                  </div>
                  <h4 className="font-bold text-center">{book.title}</h4>
                  <p className="text-sm text-gray-400">{book.authors}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
