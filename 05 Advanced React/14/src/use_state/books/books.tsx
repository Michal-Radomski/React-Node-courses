import React from "react";

import "./books.scss";

interface BooksI {
  children: React.ReactNode;
  count: number;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Books = ({ children, count, onChange, onSubmit }: BooksI): JSX.Element => {
  return (
    <React.Fragment>
      <section className="book-list gap-8">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(e);
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
              onChange={onChange}
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
