import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";
import ColumnPattern from "./components/ColumnPattern";
import GridPattern from "./components/GridPattern";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <GridPattern />
      <br />
      <hr />
      <br />
      <ColumnPattern />
      <br />
      <hr />
      <br />
      <SplitPattern />
      <br />
      <hr />
      <br />
      <LayersPattern />
    </React.Fragment>
  );
};

export default App;
