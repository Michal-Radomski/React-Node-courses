import React from "react";

import "./App.scss";
import LayersPattern from "./components/LayersPattern";
import SplitPattern from "./components/SplitPattern";
import ColumnPattern from "./components/ColumnPattern";
import GridPattern from "./components/GridPattern";
import AttrsExample from "./AttrsExample";
import InlineBundlePattern from "./components/InlineBundlePattern";
import InlinePattern from "./components/inline/InlinePattern";
import PadPattern from "./components/pad/PadPattern";
import CenterPattern from "./components/center/CenterPattern";
import MediaWrapperPattern from "./components/media-wrapper/MediaWrapperPattern";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <MediaWrapperPattern />
      <br />
      <CenterPattern />
      <br />
      <PadPattern />
      <br />
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
