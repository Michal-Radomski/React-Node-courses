import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";
import ColumnPattern from "./components/ColumnPattern";
import GridPattern from "./components/GridPattern";
import AttrsExample from "./AttrsExample";
import InlineBundlePattern from "./components/InlineBundlePattern";
import InlinePattern from "./components/inline/InlinePattern";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <InlinePattern />
      <br />
      <InlineBundlePattern />
      <br />
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
