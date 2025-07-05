import React from "react";

import "./App.scss";
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserInfo } from "./components/user-info";
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <ResourceLoader resourceUrl={"/api/users/2"} resourceName={"user"}>
        <UserInfo />
      </ResourceLoader>

      <CurrentUserLoader>
        <UserInfo />
      </CurrentUserLoader>

      <UserLoader userId={"3"}>
        <UserInfo />
      </UserLoader>

      <UserLoader userId={"2"}>
        <UserInfo />
      </UserLoader>
    </React.Fragment>
  );
};

export default App;
