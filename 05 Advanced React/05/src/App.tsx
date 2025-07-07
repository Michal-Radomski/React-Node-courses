import React from "react";

import "./App.scss";
import { UserInfo } from "./components/user-info";
import { UserInfo2 } from "./components/user-info2";
import { BookInfo } from "./components/book-info";
import { Recursive } from "./components/recursive";

const myNestedObject = {
  key1: "value1",
  key2: {
    innerKey1: "innerValue1",
    innerKey2: {
      innerInnerKey1: "innerInnerValue1",
      innerInnerKey2: "innerInnerValue2",
    },
  },
  key3: "value3",
};

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Recursive data={myNestedObject} />

      <UserInfo />
      <BookInfo url={"/api/books/1"} />
      <UserInfo2 userId={"1"} />
    </React.Fragment>
  );
};

export default App;
