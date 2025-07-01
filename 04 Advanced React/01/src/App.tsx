import React from "react";
import Color from "./atoms/Color/Color";
import Text from "./atoms/Text/Text";
import Margin from "./atoms/Margin/Margin";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Margin
        children={
          <React.Fragment>
            <Color hexCode={"#ff0000"} />
            <Text children={"Test"} />
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default App;
