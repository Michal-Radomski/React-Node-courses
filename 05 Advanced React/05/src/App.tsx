import React from "react";

import "./App.scss";
import { UserInfo } from "./components/user-info";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UserInfo />
    </React.Fragment>
  );
};

export default App;
