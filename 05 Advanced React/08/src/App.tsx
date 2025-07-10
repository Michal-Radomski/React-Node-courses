import React from "react";

import "./App.scss";
import SearchMeal from "./components/search-meals";
// import Users from "./components/users";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <SearchMeal />
      {/* <Users /> */}
    </React.Fragment>
  );
};

export default App;
