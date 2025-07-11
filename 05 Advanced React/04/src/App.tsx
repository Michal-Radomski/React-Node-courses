import React from "react";

import "./App.scss";
import { checkProps } from "./components/check-props";
import { UserInfo } from "./components/user-info";
import { users } from "../data";
import { includeUser } from "./components/include-user";
import { UserInfoForm } from "./components/user-form";

const UserInfoWrapper = checkProps(UserInfo);
const UserInfoWithUser = includeUser(UserInfo, "2");

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <UserInfoForm />
      <br />
      <UserInfoWithUser />
      <br />
      <UserInfoWrapper user={users[0]} />
    </React.Fragment>
  );
};

export default App;
