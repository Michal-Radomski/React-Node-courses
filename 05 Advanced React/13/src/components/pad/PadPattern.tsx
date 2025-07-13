import React from "react";
import { styled } from "styled-components";

import { Bottom, Button, Card, Description, Name, Price, Top } from "./Components";
import { spacingSchema } from "../../common/spaces";
import { InlineBundle } from "../InlineBundlePattern";
import { Layers } from "../LayersPattern";
import { Grid } from "../GridPattern";

export const Pad = styled.div<{ $padding?: string | string[] }>`
  padding: ${(props) => {
    return ([] as string[])
      .concat(props?.$padding as string)
      .map((padKey) => spacingSchema[padKey as keyof typeof spacingSchema])
      .join(" ");
  }};
`;

const Plans = (): JSX.Element => {
  return (
    <React.Fragment>
      <Card>
        <Pad $padding="l">
          <Top>
            <Name>Gift Card</Name>
            <Description>This is one of our gift cards you can buy.</Description>
            <Price>$25.99</Price>
            <InlineBundle $gutter="none" $justify="center">
              <Button>
                <Pad $padding={["m", "xl"]}>Buy</Pad>
              </Button>
            </InlineBundle>
          </Top>
        </Pad>

        <Bottom>
          <Pad $padding="l">
            <Layers $gutter="m">
              <span>Includes:</span>
              <ul>
                <li>This is inclusion number 1</li>
                <li>This is inclusion number 2 which comes after inclusion number1</li>
                <li>This is inclusion number 3</li>
              </ul>
            </Layers>
          </Pad>
        </Bottom>
      </Card>
    </React.Fragment>
  );
};

const PadPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Grid $gutter="xl" $minItemWidth="16rem">
        <Plans />
        <Plans />
        <Plans />
        <Plans />
      </Grid>
    </React.Fragment>
  );
};

export default PadPattern;
