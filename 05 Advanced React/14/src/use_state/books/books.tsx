import React from "react";

import "./books.scss";
import { BookI } from "../../Interfaced";
import { fetchBooks } from "../../App";

interface BooksI {
  // children: React.ReactNode;
  // count: number;
  // onSubmit: React.FormEventHandler<HTMLFormElement>;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
  setBooks: React.Dispatch<React.SetStateAction<BookI[]>>;
}

// export const Books = ({ children, count, onChange, onSubmit }: BooksI): JSX.Element => {
export const Books = ({ children, setBooks }: React.PropsWithChildren<BooksI>): JSX.Element => {
  const [count, setCount] = React.useState<number>(4);

  return (
    <React.Fragment>
      <section className="book-list gap-8">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // onSubmit(e);
            fetchBooks(count).then(setBooks);
          }}
        >
          <label htmlFor="number-of-books-to-load" className="book-form-label">
            Number of Books to Load
          </label>
          <div className="flex">
            <input
              id="number-of-books-to-load"
              className="book-input w-full"
              type="number"
              min="0"
              max="20"
              value={count}
              // onChange={onChange}
              onChange={(e) => setCount(e.target.valueAsNumber)}
            />
            <button type="submit" className="book-button">
              Load Books
            </button>
          </div>
        </form>
        <div className="book-grid">{children}</div>
      </section>
    </React.Fragment>
  );
};

export default Books;
