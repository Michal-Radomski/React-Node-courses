import React from "react";

export const UserInfo = ({ user }: { user: User }): JSX.Element => {
  const { name, age, country, books } = user || {};

  return user ? (
    <React.Fragment>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books.map((book: string) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};
