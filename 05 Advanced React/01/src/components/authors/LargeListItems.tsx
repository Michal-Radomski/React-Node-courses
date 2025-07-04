import React from "react";

export const LargeAuthorListItem = ({ author }: { author?: Author }): JSX.Element => {
  const { name, age, country, books } = author as Author;

  return (
    <React.Fragment>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book: string) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </React.Fragment>
  );
};
