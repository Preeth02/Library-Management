import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import fetchReq from "@/utilityFunctions/fetchReq";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { toast } from "sonner";
import { borrowedBook, returnedBooks } from "@/store/authSlice";

function BookDetails() {
  const { bookId } = useParams();
  const [error, setError] = useState(null);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const booksFromStore = useSelector((state) => state.books.booksData);
  const userBooks = useSelector((state) => state.auth.userBooks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   console.log(bookId.split(":")[1]);
  const borrowTheBook = async () => {
    if (
      userBooks.filter((book_Id) => book_Id === bookId.split(":")[1]).length > 0
    ) {
      toast("You cannot borrow the same book again");
      return;
    } else if (userBooks.length === 3) {
      toast("You cannot borrow more than 3 books at a time");
      return;
    }
    const borrowed = await fetchReq({
      link: `http://localhost:3000/api/v1/book/borrow/book/${
        bookId.split(":")[1]
      }`,
      method: "PATCH",
    });
    if (borrowed.error) {
      toast(
        "There was something wrong while borrowing the book.Please try again"
      );
    } else {
      toast("Book has been successfully added to your collection.");
      dispatch(borrowedBook(bookId.split(":")[1]));
    }
  };
  const returnTheBook = async () => {
    // if (
    //   userBooks.filter((book_Id) => book_Id === bookId.split(":")[1]).length > 0
    // ) {
    //   toast("You cannot borrow the same book again");
    //   return;
    // } else if (userBooks.length === 3) {
    //   toast("You cannot borrow more than 3 books at a time");
    //   return;
    // }
    const returning = await fetchReq({
      link: `http://localhost:3000/api/v1/book/return/book/${
        bookId.split(":")[1]
      }`,
      method: "PATCH",
    });
    if (returning.error) {
      toast(
        "There was something wrong while returning the book.Please try again"
      );
    } else {
      toast("Book has been successfully returned.");
      dispatch(returnedBooks(bookId.split(":")[1]));
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const fetchBook = await fetchReq({
        link: `http://localhost:3000/api/v1/book/get-book/${
          bookId.split(":")[1]
        }`,
      });
      if (!fetchBook) {
        setError(fetchBook.error.message);
      } else {
        setBook(fetchBook.data);
        // console.log(fetchBook);
      }
      setLoading(false);
    })();
    return () => {
      setBook(null);
      setError(null);
    };
  }, [bookId]);
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full flex flex-col flex-1 p-4">
      {/* Search Bar */}
      <SearchBar />
      {/* <div className="flex flex-col"> */}
      {/* Featured Section */}
      {loading && <div> Loading...</div>}
      {!loading && (
        <div className="flex flex-col gap-6">
          <div className="flex-1 flex flex-col items-start mb-4">
            <div className="bg-gray-800 rounded-lg p-3 shadow-lg w-9/12 h-1/3 flex gap-4">
              <div className="object-none">
                <img
                  src={book.frontCover}
                  alt="Book Cover"
                  className="rounded-lg w-full mb-4 object-cover"
                />
              </div>

              <div className="flex flex-col space-y-20">
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Author: {book.authors}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    {book.description}
                  </p>
                  <p className="text-yellow-400 text-sm mt-2">★ 4</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
                    onClick={borrowTheBook}
                  >
                    Borrow Book
                  </Button>
                  {userBooks.includes(bookId.split(":")[1]) && (
                    <Button
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full"
                      onClick={returnTheBook}
                    >
                      Return Book
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Sponsored Items */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-4">Similar Items</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
              {/* Comic Cards */}
              {booksFromStore?.books &&
                booksFromStore.books
                  ?.filter((book) => book._id !== bookId.split(":")[1])
                  .map((book) => (
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
      )}
    </div>
  );
}

export default BookDetails;
