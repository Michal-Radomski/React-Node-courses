import React from "react";
import styled from "styled-components";

import img from "../../images/profile-img.jpg";
import { Split } from "../SplitPattern";

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

export const LogoImg = styled.img`
  border-radius: 50%;
`;

export const Wrapper = styled(Split)`
  align-items: center;
  > [data-layout-mediawrapper] {
    min-width: 3rem;
  }
`;

export const Extras = (): JSX.Element => (
  <React.Fragment>
    <Wrapper $fraction="auto-start" $gutter="l">
      <MediaWrapper data-layout-mediawrapper $ratio={[1, 1]}>
        <LogoImg src={img} alt="" />
      </MediaWrapper>

      <span>Unknown Image / Downloaded from unsplash.com </span>
    </Wrapper>
  </React.Fragment>
);
