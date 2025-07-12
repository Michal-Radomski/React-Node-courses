import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";
import ColumnPattern from "./components/ColumnPattern";
import GridPattern from "./components/GridPattern";
import AttrsExample from "./AttrsExample";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <AttrsExample />
      <br />
      <GridPattern />
      <hr />
      <ColumnPattern />
      <hr />
      <SplitPattern />
      <hr />
      <LayersPattern />
    </React.Fragment>
  );
};

export default App;
