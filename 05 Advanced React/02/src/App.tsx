import React from "react";
import axios from "axios";

import "./App.scss";
import { CurrentUserLoader } from "./components/current-user-loader";
import { UserInfo } from "./components/user-info";
import { UserLoader } from "./components/user-loader";
import { ResourceLoader } from "./components/resource-loader";
import { BookInfo } from "./components/book-info";
import { DataSource } from "./components/data-source";
import { DataSourceWithRenderProps } from "./components/data-source-with-render";

const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

const getDataFromLocalStorage = (key: string) => () => {
  return localStorage.getItem(key);
};

const Message = ({ msg }: { msg?: string }): JSX.Element => <h1>{msg}</h1>;

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <DataSource getData={() => getDataFromLocalStorage("test")} resourceName={"msg"}>
        <Message />
      </DataSource>

      <DataSourceWithRenderProps
        getData={() => fetchData("/api/users/1")}
        render={(resource: User) => <UserInfo user={resource} />}
      />

      <DataSource getData={() => fetchData("/api/users/1")} resourceName={"user"}>
        <UserInfo />
      </DataSource>

      <ResourceLoader resourceUrl={"/api/users/2"} resourceName={"user"}>
        <UserInfo />
      </ResourceLoader>

      <ResourceLoader resourceUrl={"/api/books/2"} resourceName={"book"}>
        <BookInfo />
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
