import React from "react";

import "./App.scss";
import SearchMeal from "./components/search-meals";
import TrackMouse from "./throttle/track-mouse";
import Search from "./debounce/search";
// import Users from "./components/users";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* //* Debouncing is a technique that delays the execution until a specific amount of time */}
      <Search />

      {/* //* Throttling: only once for a specific time */}
      <TrackMouse />

      <SearchMeal />
      {/* <Users /> */}
    </React.Fragment>
  );
};

export default App;
