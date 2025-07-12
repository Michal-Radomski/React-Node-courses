import React from "react";
import { styled } from "styled-components";

import { spacingSchema } from "../common/spaces";
import Form from "./Form";

const fractions = {
  "1/4": "1fr 3fr",
  "1/3": "1fr 2fr",
  "1/2": "1fr 1fr",
  "2/3": "2fr 1fr",
  "3/4": "3fr 1fr",
  "auto-start": "auto 1fr",
  "auto-end": "1fr auto",
};

export const Split = styled.div<{ $gutter?: string; $fraction?: string }>`
  display: grid;
  gap: ${(props) => spacingSchema[props.$gutter as keyof typeof spacingSchema] ?? spacingSchema.l};
  grid-template-columns: ${({ $fraction }) => fractions[$fraction as keyof typeof fractions] ?? fractions["1/2"]};
`;

const SplitPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Split $fraction="1/3" $gutter="xxl">
        <div>
          <h3>General Information</h3>
          <span>All the information you provide via this form will be exposed to the public.</span>
        </div>
        <Form />
      </Split>
    </React.Fragment>
  );
};

export default SplitPattern;
