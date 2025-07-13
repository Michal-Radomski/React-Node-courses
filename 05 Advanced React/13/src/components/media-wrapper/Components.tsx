import React from "react";

import { Center } from "../center/CenterPattern";
import { Pad } from "../pad/PadPattern";

export const Description = (props: { children: string }): JSX.Element => (
  <React.Fragment>
    <Pad $padding="l">
      <Center $centerText>{props.children}</Center>
    </Pad>
  </React.Fragment>
);
