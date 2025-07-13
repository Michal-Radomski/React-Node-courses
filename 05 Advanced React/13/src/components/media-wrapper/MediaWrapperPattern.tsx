import React from "react";
import { styled } from "styled-components";

import tshirt from "../../images/tshirt.jpg";
import { Description } from "./Components";
import { Grid } from "../GridPattern";

export const MediaWrapper = styled.div<{ $ratio: number[] }>`
  --n: ${(props) => (props.$ratio ? props.$ratio[0] : 1)};
  --d: ${(props) => (props.$ratio ? props.$ratio[1] : 1)};

  ${(props) =>
    props.$ratio &&
    `
  aspect-ratio: var(--n) / var(--d);
  @supports not (aspect-ratio: 1/1) {
    padding-block-end: calc(var(--d) / var(--n) * 100%);
  }
`}

  position: relative;

  > * {
    position: absolute;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img,
  > video {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
`;

const NewProduct = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <MediaWrapper $ratio={[1, 1]}>
          <img src={tshirt} alt="" />
        </MediaWrapper>

        <Description>White T-shirt - $19.99</Description>
      </div>
    </React.Fragment>
  );
};

const MediaWrapperPattern = (): JSX.Element => {
  return (
    <React.Fragment>
      <Grid $gutter="xl" $minItemWidth="18rem">
        <NewProduct />
        <NewProduct />
        <NewProduct />
        <NewProduct />
      </Grid>
    </React.Fragment>
  );
};

export default MediaWrapperPattern;
