import React from "react";
import { hex } from "color-convert"; // Importing the color-convert library

import LabeledInput from "../common/labeled-input"; // Importing the LabeledInput component

const containerStyle: React.CSSProperties = {
  display: "grid",
  width: "100%",
  gridAutoFlow: "column",
  gap: "0.5rem",
};

type HexToHSLProps = {
  hexColor: string;
};

const HexToHSL = ({ hexColor }: HexToHSLProps): JSX.Element => {
  // Convert the hexColor to HSL format using color-convert library
  const color = hex.hsl(hexColor);
  const [h, s, l] = color;

  return (
    <React.Fragment>
      <section style={containerStyle}>
        {/* Display LabeledInput components for each HSL component */}
        <LabeledInput label="H" type="number" value={h} />
        <LabeledInput label="S" type="number" value={s} />
        <LabeledInput label="L" type="number" value={l} />
      </section>
    </React.Fragment>
  );
};

export default HexToHSL;
