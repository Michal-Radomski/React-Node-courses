import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";
import ColumnPattern from "./components/ColumnPattern";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <ColumnPattern />
      <br />
      <SplitPattern />
      <br />
      <LayersPattern />
    </React.Fragment>
  );
};

export default App;
