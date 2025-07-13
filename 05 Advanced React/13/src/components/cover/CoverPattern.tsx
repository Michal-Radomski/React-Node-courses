import React from "react";
import { styled } from "styled-components";

import { Button } from "./Components";
import { spacingSchema } from "../../common/spaces";
import { InlineBundle } from "../InlineBundlePattern";
import { Layers } from "../LayersPattern";
import { Pad } from "../pad/PadPattern";

interface CoverProps {
  $top?: React.ReactNode;
  $bottom?: React.ReactNode;
  $gutter?: string;
  $minHeight?: string;
}

const Cover = styled.div.attrs<CoverProps>(({ children, $top, $bottom }) => {
  return {
    children: (
      <React.Fragment>
        {$top ? <div>{$top}</div> : null}
        <div data-cover-child>{children}</div>
        {$bottom ? <div>{$bottom}</div> : null}
      </React.Fragment>
    ),
  };
})`
  display: grid;
  gap: ${(props) => spacingSchema[props.$gutter as keyof typeof spacingSchema] ?? spacingSchema.l};
  min-block-size: ${(props) => props.$minHeight ?? "100vh"};
  grid-template-rows: ${({ $top, $bottom }) =>
    $top && $bottom ? "auto 1fr auto" : $top ? "auto 1fr" : $bottom ? "1fr auto" : "1fr"};

  > [data-cover-child] {
    align-self: center;
  }
`;

const Top = (): JSX.Element => {
  return (
    <React.Fragment>
      <InlineBundle $gutter="xl" $justify="end">
        <span>Home</span>
        <span>Products</span>
        <span>Blog</span>
        <span>Contact Us</span>
      </InlineBundle>
    </React.Fragment>
  );
};

const Bottom = (): JSX.Element => {
  return (
    <React.Fragment>
      <InlineBundle $gutter="xl" $justify="center">
        <a href="/#">Terms and Rules</a>
      </InlineBundle>
    </React.Fragment>
  );
};

const CoverPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Cover as={Pad} $padding="l" $top={<Top />} $bottom={<Bottom />}>
        <Layers $gutter="l">
          <h1>CodeLicks</h1>
          <span>Learn and grow</span>
          <InlineBundle $gutter="l">
            <Button $primary>Enroll now</Button>
            <Button>Register</Button>
          </InlineBundle>
        </Layers>
      </Cover>
    </React.Fragment>
  );
};

export default CoverPattern;
