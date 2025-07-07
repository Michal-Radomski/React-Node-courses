import React from "react";

export const BookInfo = ({ book }: { book?: Book }): JSX.Element => {
  const { name, price, title, pages } = book || {};

  return book ? (
    <React.Fragment>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Title: {title}</h3>
      <p>Number of Pages: {pages}</p>
    </React.Fragment>
  ) : (
    <h1>Loading</h1>
  );
};
