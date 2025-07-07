import React from "react";

// import { useCurrentUser } from "./current-user.hook";
import { useUser } from "./user.hook";

export const UserInfo = (): JSX.Element => {
  // const user: User = useCurrentUser();
  const user: User = useUser("1");

  const { name, age, country, books } = user || {};

  return user ? (
    <React.Fragment>
      <h2>{name}</h2>
      <p>Age: {age} years</p>
      <p>Country: {country}</p>
      <h2>Books</h2>
      <ul>
        {books?.map((book: string) => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </React.Fragment>
  ) : (
    <h1>Loading...</h1>
  );
};
