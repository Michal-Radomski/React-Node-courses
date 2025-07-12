import React from "react";
import { styled } from "styled-components";

import { spacingSchema } from "../common/spaces";
import Card from "./Card";

export const Grid = styled.div<{ $gutter: string; $minItemWidth: string }>`
  display: grid;
  gap: ${(props) => spacingSchema[props.$gutter as keyof typeof spacingSchema] ?? spacingSchema.l};

  grid-template-columns: repeat(auto-fit, minmax(min(${(props) => props.$minItemWidth}, 100%), 1fr));
`;

const GridPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Grid $gutter="x" $minItemWidth="24rem">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </React.Fragment>
  );
};

export default GridPattern;
