import React from "react";

import "./App.scss";
import { UserInfo } from "./components/user-info";
import { UserInfo2 } from "./components/user-info2";
import { BookInfo } from "./components/book-info";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UserInfo />
      <BookInfo url={"/api/books/1"} />
      <UserInfo2 userId={"1"} />
    </React.Fragment>
  );
};

export default App;
