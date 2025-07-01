import React from "react";

import Color from "./atoms/Color/Color";
import Text from "./atoms/Text/Text";
import Margin from "./atoms/Margin/Margin";
import Select from "./molecules/Select";

const App = (): React.JSX.Element => {
  return (
    <React.Fragment>
      <Margin
        space="md"
        left={false}
        top={true}
        children={
          <React.Fragment>
            <Color hexCode={"#ff0000"} width="xxxl" height="xxxl" />
            <Text children={"Test"} />
          </React.Fragment>
        }
      />
      <Margin
        space="md"
        children={
          <React.Fragment>
            <Color hexCode={"#ff00ff"} width="xxxl" height="xxxl" />
            <Text children={"Test"} />
          </React.Fragment>
        }
      />

      <Text children={"Test"} />

      <button className="dse-button-container">Example Button</button>

      <Select
        options={[
          {
            label: "Option_1",
            value: "Value_1",
          },
          {
            label: "Option_2",
            value: "Value_2",
          },
          {
            label: "Option_3",
            value: "Value_3",
          },
        ]}
      />
    </React.Fragment>
  );
};

export default App;
