import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import SearchBar from "@/components/SearchBar";
import fetchReq from "@/utilityFunctions/fetchReq";
import { useDispatch } from "react-redux";
import { addBooks } from "@/store/bookSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function FilterBooks() {
  const { query } = useParams();
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const booksInStore = useSelector((state) => state.books.booksData);
  //   console.log(bookId);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const fetchBooks = await fetchReq({
        link: `http://localhost:3000/api/v1/book/get-books?query=${query}&limit=8&page=${pages}`,
      });
      if (fetchBooks.data) {
        setBooks(fetchBooks.data);
        // console.log(fetchBooks.data);
        // console.log(pages);
        dispatch(addBooks(fetchBooks.data));
      } else if (fetchBooks.error) {
        setError(fetchBooks.error.message);
      }
    })();
    setLoading(false);
    return () => {};
  }, [query, pages]);

  if (loading) {
    <div className="bg-gray-600 w-screen h-screen flex justify-center items-center font-extrabold text-white text-2xl">
      Loading...
    </div>;
  } else
    return (
      <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col flex-1 p-4">
        {/* Search Bar */}
        <SearchBar />
        <div className="min-w-full gap-6 ">
          {/* Top Rated Comics */}
          <div>
            {/* <h3 className="text-lg font-bold mb-4">Top Rated Books</h3> */}
            {books?.books?.length === 0 && (
              <div className="text-2xl w-full flex">
                No books with the following details: {query}
              </div>
            )}
            {books?.books && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                {/* Comic Cards */}
                {books.books?.map((book) => (
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
            )}
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`${
                  !books?.paginationDetails?.hasBefore
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                onClick={() =>
                  books?.paginationDetails?.hasBefore &&
                  setPages((state) => state - 1)
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{pages}</PaginationLink>
            </PaginationItem>
            <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`${
                  !books?.paginationDetails?.hasMore
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } `}
                onClick={() =>
                  books?.paginationDetails?.hasMore &&
                  setPages((state) => state + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
}

export default FilterBooks;
