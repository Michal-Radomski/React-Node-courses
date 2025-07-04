import React from "react";

export const LargeBookListItem = ({ book }: { book?: Book }): JSX.Element => {
  const { name, price, title, pages } = book as Book;

  return (
    <React.Fragment>
      <h2>{name}</h2>
      <p>{price}</p>
      <h2>Title:</h2>
      <p>{title}</p>
      <p># of Pages: {pages}</p>
    </React.Fragment>
  );
};
