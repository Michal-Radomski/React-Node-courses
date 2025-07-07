import React from "react";

import "./App.scss";
import { UserInfo } from "./components/user-info";
import { UserInfo2 } from "./components/user-info2";
import { BookInfo } from "./components/book-info";
import { Recursive } from "./components/recursive";
import { SmallButton, SmallRedButton } from "./components/composition";
import { LargeRedButton2, SmallButton2 } from "./components/partial";

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
      <SmallButton2 />
      <LargeRedButton2 />
      <br />
      <SmallButton text={"I am small!"} />
      <SmallRedButton text={"I am small and Red"} />

      <Recursive data={myNestedObject} />
      <Recursive data={"string"} />

      <UserInfo />
      <BookInfo url={"/api/books/1"} />
      <UserInfo2 userId={"1"} />
    </React.Fragment>
  );
};

export default App;
