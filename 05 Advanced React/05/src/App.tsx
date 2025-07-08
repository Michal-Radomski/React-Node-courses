import React from "react";

import "./App.scss";
import { UserInfo } from "./components/user-info";
import { UserInfo2 } from "./components/user-info2";
import { BookInfo } from "./components/book-info";
import { Recursive } from "./components/recursive";
import { SmallButton, SmallRedButton } from "./components/composition";
import { LargeRedButton2, SmallButton2 } from "./components/partial";
import Card from "./components/card";

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
      <Card test="Value">
        <Card.Header>
          <h1 style={{ margin: "0" }}>Header</h1>
        </Card.Header>
        <Card.Body>
          He hid under the covers hoping that nobody would notice him there. It really didn't make much sense since it would
          be obvious to anyone who walked into the room there was someone hiding there, but he still held out hope. He heard
          footsteps coming down the hall and stop in front in front of the bedroom door. He heard the squeak of the door
          hinges and someone opened the bedroom door. He held his breath waiting for whoever was about to discover him, but
          they never did.
        </Card.Body>
        <Card.Footer>
          <button>Ok</button>
          <button>Cancel</button>
        </Card.Footer>
      </Card>

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
