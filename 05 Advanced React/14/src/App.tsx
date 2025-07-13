import React from "react";
import axios from "axios";

import "./App.scss";
import ShoppingCard from "./use_state/shopping-card";
import { BookI } from "./Interfaced";
import Loader from "./use_state/loader/loader";
import Book from "./use_state/books/book";

// eslint-disable-next-line react-refresh/only-export-components
export const fetchRandomBook = async () => {
  const response = await axios.get(`/api/books/random`);
  return response.data;
};

// eslint-disable-next-line react-refresh/only-export-components
export const fetchBook = async (count: number) => {
  const response = await axios.get(`/api/books?limit=${count}`);
  return response.data;
};

const App = (): JSX.Element => {
  const [book, setBook] = React.useState<BookI | undefined>(undefined);
  // console.log("book:", book);

  React.useEffect(() => {
    fetchRandomBook().then(setBook);
  }, []);

  if (!book) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <main className="w-full max-w-2xl py-16 mx-auto">
        <Book title={book.title} author={book.author} />
      </main>
      <ShoppingCard />
    </React.Fragment>
  );
};

export default App;
