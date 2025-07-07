import React from "react";
import axios from "axios";

import { useDataSource } from "./data-source.hook";

const fetchFromServer = (url: string) => async (): Promise<Any> => {
  const response = await axios.get(url);
  return response.data;
};

// const getFromLocalStorage = (key: string) => (): Any => {
//   return localStorage.getItem(key) as unknown as Any;
// };

export const UserInfo2 = ({ userId }: { userId: string }): JSX.Element => {
  //^ Not a good pattern?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUser = React.useCallback(fetchFromServer(`/api/users/${userId}`), [userId]);

  const user = useDataSource(fetchUser as unknown as () => Any) as User;

  const { name, age, country, books } = user || {};

  // const message = useDataSource(getFromLocalStorage("msg")) as User;
  // console.log("message:", message);

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
