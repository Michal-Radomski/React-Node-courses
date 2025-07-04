import React from "react";

export const SmallBookListItem = ({ book }: { book?: Book }): JSX.Element => {
  const { name, price } = book as Book;

  return (
    <React.Fragment>
      <h2>
        {name} / {price}
      </h2>
    </React.Fragment>
  );
};
