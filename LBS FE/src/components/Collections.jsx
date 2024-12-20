import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import fetchReq from "@/utilityFunctions/fetchReq";
import { useNavigate } from "react-router-dom";

function Collections() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await fetchReq({
        link: `http://localhost:3000/api/v1/book/get-collections`,
      }).then((res) => {
        // console.log(res.data.userBooks);
        setBooks(res.data.userBooks);
      });
    })();
  }, []);
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col flex-1 p-4">
      {/* Search Bar */}
      <SearchBar />
      {/* Featured Section */}
      <div className="min-w-full gap-6 ">
        {/* Top Rated Comics */}
        <div>
          <h3 className="text-lg font-bold mb-4">Borrowed Books</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {/* Comic Cards */}
            {books &&
              books.map((book) => (
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

export default Collections;
