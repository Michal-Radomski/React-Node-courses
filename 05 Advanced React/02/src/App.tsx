import React from "react";

import "./App.scss";
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserInfo } from "./components/user-info";
import { UserLoader } from "./components/user-loader";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>

      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>
    </React.Fragment>
  );
};

export default App;
